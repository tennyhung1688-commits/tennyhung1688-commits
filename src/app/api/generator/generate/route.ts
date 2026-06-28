/* ===================================================================
   Generator API — Real AI Image Generation
   
   POST /api/generator/generate
   Body: { mode: 'white-bg'|'lifestyle'|'infographic', platform: 'amazon'|..., productDesc: string }
   Returns: { success: true, imageUrl: string, remaining: number }

   MVP flow: user describes product → AI-generated image via Pollinations
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/* Prompt templates per platform & mode */
const PROMPTS: Record<string, Record<string, string>> = {
  amazon: {
    'white-bg': 'professional product photography of {product}, pure white background, studio lighting, 2000x2000, e-commerce photography, 8k, high detail, no shadows on background, commercial product shot',
    'lifestyle': '{product} in a beautiful modern lifestyle setting, natural soft lighting, depth of field, professional product photography, cozy atmosphere, 4k',
    'infographic': '{product} with detailed callout labels showing key features and dimensions, clean infographic style, white background, e-commerce product display, professional',
  },
  shopee: {
    'white-bg': 'professional product photo of {product}, clean white background, bright studio lighting, 1:1 square, e-commerce ready, high quality',
    'lifestyle': '{product} in an attractive lifestyle scene, warm tones, natural light, southeast asian aesthetic, professional photography',
  },
  tiktok: {
    'white-bg': '{product} on clean background, bright and vibrant, social media ready, high contrast, eye-catching, vertical 9:16',
    'lifestyle': 'trendy {product} in an aesthetic lifestyle setting, warm lighting, TikTok-worthy, natural pose, viral style',
  },
  taobao: {
    'white-bg': '淘宝商品主图 {product}，纯白背景，800x800，影棚灯光，高清商品摄影，电商白底图',
    'lifestyle': '{product} 生活场景，自然光线，温馨氛围，淘宝风格，高清商品摄影',
  },
  // Default fallback for any platform
  default: {
    'white-bg': 'professional product photography of {product}, pure white background, studio lighting, 1:1 square, e-commerce photography, high detail',
    'lifestyle': '{product} in a beautiful lifestyle setting, natural lighting, professional photography',
    'infographic': '{product} with labeled key features, clean infographic style, professional product display',
  },
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon')) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await req.json();
    const { mode = 'white-bg', platform = 'amazon', productDesc, userId } = body as {
      mode?: string;
      platform?: string;
      productDesc?: string;
      userId?: string;
    };

    if (!productDesc || productDesc.trim().length < 2) {
      return NextResponse.json({ error: 'Please describe your product' }, { status: 400 });
    }

    /* Quota check */
    let remaining = 999;
    if (supabase && userId) {
      const { data: profile } = await supabase.from('profiles').select('credits_images').eq('id', userId).single();
      if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      if (profile.credits_images <= 0) {
        return NextResponse.json({
          error: 'No image credits remaining',
          message: 'You have used all your image credits. Upgrade your plan to continue.',
          messageZh: '图片生成额度已用完，请升级套餐继续使用。',
          upgradeUrl: '/pricing',
        }, { status: 403 });
      }
      remaining = profile.credits_images - 1;
    }

    /* Build prompt */
    const platformPrompts = PROMPTS[platform] || PROMPTS.default;
    const template = platformPrompts[mode] || platformPrompts['white-bg'];
    const prompt = template.replace('{product}', productDesc.trim());

    /* Generate image via Pollinations.ai (free, no API key needed) */
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Date.now();
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

    /* Deduct quota */
    if (supabase && userId) {
      await supabase.from('profiles').update({ credits_images: remaining }).eq('id', userId);
      await supabase.from('generation_logs').insert({
        user_id: userId,
        type: 'image',
        prompt,
        result_url: imageUrl,
        status: 'success',
      });
    }

    /* Also try DeepSeek to enhance the prompt for better results */
    let enhancedImageUrl = imageUrl;
    try {
      const deepseekKey = process.env.DEEPSEEK_API_KEY;
      if (deepseekKey) {
        const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${deepseekKey}` },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are a product photography prompt engineer. Enhance the given prompt to produce better e-commerce product images. Add specific lighting, angle, and composition details. Output ONLY the enhanced prompt, nothing else.' },
              { role: 'user', content: prompt },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });
        if (dsRes.ok) {
          const dsData = await dsRes.json();
          const enhancedPrompt = dsData.choices?.[0]?.message?.content?.trim();
          if (enhancedPrompt) {
            const encodedEnhanced = encodeURIComponent(enhancedPrompt);
            enhancedImageUrl = `https://image.pollinations.ai/prompt/${encodedEnhanced}?width=1024&height=1024&seed=${seed + 1}&nologo=true`;
          }
        }
      }
    } catch {
      // DeepSeek enhancement failed — use basic prompt
    }

    return NextResponse.json({
      success: true,
      imageUrl: enhancedImageUrl,
      prompt,
      remaining,
      limit: supabase ? 500 : 999,
    });
  } catch (error) {
    console.error('[Generate API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
