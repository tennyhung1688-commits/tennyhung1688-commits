/* ===================================================================
   Generator API — Agnes AI (Image + Video)
   
   POST /api/generator/generate
   Body: { mode, platform, productDesc, type ('image'|'video'), userId }
   
   Image: Agnes agnes-image-2.1-flash via /v1/images/generations
   Video: Agnes agnes-video-v2.0 via /v1/videos (async, returns task)
   =================================================================== */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const AGNES_BASE = 'https://apihub.agnes-ai.com/v1';

/* Prompt templates per platform & mode */
const PROMPTS: Record<string, Record<string, string>> = {
  amazon: {
    'white-bg': 'professional product photography of {product}, pure white background, studio lighting, 2000x2000, e-commerce photography, high detail, no shadows on background, commercial product shot',
    'lifestyle': '{product} in a beautiful modern lifestyle setting, natural soft lighting, depth of field, professional product photography, cozy atmosphere',
    'infographic': '{product} with detailed callout labels showing key features and dimensions, clean infographic style, white background, e-commerce product display, professional',
  },
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
  const agnesKey = process.env.AGNES_API_KEY;

  try {
    const body = await req.json();
    const { mode = 'white-bg', platform = 'amazon', productDesc, userId, type = 'image' } = body as {
      mode?: string;
      platform?: string;
      productDesc?: string;
      userId?: string;
      type?: 'image' | 'video';
    };

    if (!productDesc || productDesc.trim().length < 2) {
      return NextResponse.json({ error: 'Please describe your product' }, { status: 400 });
    }

    if (!agnesKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }

    /* Quota check */
    let remaining = 999;
    if (supabase && userId) {
      const field = type === 'image' ? 'credits_images' : 'credits_videos';
      const { data: profile } = await supabase.from('profiles').select(field).eq('id', userId).single();
      if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      if ((profile as any)[field] <= 0) {
        return NextResponse.json({
          error: `No ${type} credits remaining`,
          message: 'Upgrade your plan to continue.',
          messageZh: `${type === 'image' ? '图片' : '视频'}生成额度已用完，请升级套餐。`,
          upgradeUrl: '/pricing',
        }, { status: 403 });
      }
      remaining = (profile as any)[field] - 1;
    }

    /* Build prompt */
    const platformPrompts = PROMPTS[platform] || PROMPTS.default;
    const template = platformPrompts[mode] || platformPrompts['white-bg'];
    const prompt = template.replace('{product}', productDesc.trim());

    /* Enhance prompt via Agnes text model */
    let enhancedPrompt = prompt;
    try {
      const enhanceRes = await fetch(`${AGNES_BASE}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${agnesKey}` },
        body: JSON.stringify({
          model: 'agnes-2.0-flash',
          messages: [
            { role: 'system', content: 'Enhance this product photography prompt with specific lighting, angle, and composition details. Output ONLY the enhanced prompt.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 200,
        }),
      });
      if (enhanceRes.ok) {
        const data = await enhanceRes.json();
        enhancedPrompt = data.choices?.[0]?.message?.content?.trim() || prompt;
      }
    } catch { /* use original prompt */ }

    /* ── Image Generation ── */
    if (type === 'image') {
      const imgRes = await fetch(`${AGNES_BASE}/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${agnesKey}` },
        body: JSON.stringify({
          model: 'agnes-image-2.1-flash',
          prompt: enhancedPrompt,
          size: '1024x1024',
          n: 1,
        }),
      });

      if (!imgRes.ok) {
        const err = await imgRes.text();
        console.error('[Agnes Image] Error:', imgRes.status, err);
        return NextResponse.json({ error: 'Image generation failed' }, { status: 502 });
      }

      const imgData = await imgRes.json();
      const imageUrl = imgData.data?.[0]?.url || imgData.data?.[0]?.b64_json;

      /* Deduct quota */
      if (supabase && userId) {
        await supabase.from('profiles').update({ credits_images: remaining }).eq('id', userId);
        await supabase.from('generation_logs').insert({
          user_id: userId, type: 'image', prompt: enhancedPrompt, result_url: imageUrl, status: 'success',
        });
      }

      return NextResponse.json({
        success: true,
        imageUrl,
        prompt: enhancedPrompt,
        remaining,
        limit: supabase ? 4000 : 999,
      });
    }

    /* ── Video Generation (async) ── */
    const vidRes = await fetch(`${AGNES_BASE}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${agnesKey}` },
      body: JSON.stringify({
        model: 'agnes-video-v2.0',
        prompt: enhancedPrompt,
        height: 768,
        width: 1152,
        num_frames: 81,
        frame_rate: 24,
      }),
    });

    if (!vidRes.ok) {
      const err = await vidRes.text();
      console.error('[Agnes Video] Create error:', vidRes.status, err);
      return NextResponse.json({ error: 'Video generation failed' }, { status: 502 });
    }

    const vidData = await vidRes.json();
    const taskId = vidData.task_id || vidData.id;
    const videoId = vidData.video_id;

    /* Deduct quota */
    if (supabase && userId) {
      await supabase.from('profiles').update({ credits_videos: remaining }).eq('id', userId);
      await supabase.from('generation_logs').insert({
        user_id: userId, type: 'video', prompt: enhancedPrompt, status: 'pending',
      });
    }

    return NextResponse.json({
      success: true,
      taskId,
      videoId,
      status: 'queued',
      prompt: enhancedPrompt,
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
