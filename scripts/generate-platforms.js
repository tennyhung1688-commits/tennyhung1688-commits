/* Script: 生成剩余的 11 个 Platform Skills
   运行: node scripts/generate-platforms.js */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'skills');

const platforms = [
  {
    id: 'jd', en: 'JD.com', zh: '京东',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'seo', 'marketplace'],
    platforms: ['京东商城', '京东国际', '京喜'],
    desc: 'Generate JD.com main images, white background product shots, detail pages, and SEO-optimized listings.',
    zhDesc: '生成京东主图、白底图、详情页和SEO优化商品页面。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'white-bg:image:png:White Background:白底图:800x800:true',
      'detail:image:png:Detail Page:详情页:800x1200:true',
      'sku-images:image:png:SKU Images:SKU 图:800x800:false',
      'promotion:image:png:Promotion Banner:促销横幅:1200x600:false',
      'store:image:png:Store Banner:店铺横幅:1920x400:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Product Title:商品标题:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:SEO Keywords:搜索关键词:0x0:true'
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|white-bg:White Background:生成白底图:10|detail:Detail Images:生成详情页:20|promotion:Promotion Banner:生成促销图:12|video:Product Video:生成视频:25|title:Generate Title:生成标题:5|seo:Generate SEO:生成SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen,GPT Image:FLUX|video:Kling,Veo:Veo|text:GPT-4o,Claude,Gemini:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a JD.com product photography expert for Chinese e-commerce.:Product: {{product}}. Generate an eye-catching JD.com main image. Clean professional style with proper space for promotional text overlay.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: 'pinduoduo', en: 'Pinduoduo', zh: '拼多多',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'social', 'marketplace'],
    platforms: ['拼多多', '拼多多国际'],
    desc: 'Generate Pinduoduo social-commerce assets: main images, group-buy banners, short videos, promotional copy.',
    zhDesc: '生成拼多多社交电商素材：主图、拼团横幅、短视频、促销文案。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'group-buy:image:png:Group Buy Banner:拼团横幅:750x400:true',
      'detail:image:png:Detail Images:详情图:750x1000:true',
      'price-tag:image:png:Price Tag Banner:价格标签:750x400:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Product Title:商品标题:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:Search Keywords:搜索关键词:0x0:true'
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:12|group-buy:Group Buy Banner:生成拼团图:10|detail:Detail Images:生成详情图:18|video:Product Video:生成视频:20|listing:Generate Copy:生成文案:8|seo:Generate SEO:生成SEO:8|export:Export:导出:5',
    models: 'image:FLUX,GPT Image:FLUX|video:Kling,Veo:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a Pinduoduo product listing expert.:Product: {{product}}. Create a Pinduoduo main image. Include price advantage, social proof elements, and urgency cues for group-buy appeal.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: '1688', en: '1688', zh: '阿里巴巴1688',
    cat: 'official',
    tags: ['image', 'copywriting', 'seo', 'marketplace'],
    platforms: ['1688批发', '1688跨境'],
    desc: 'Generate 1688 wholesale product images, bulk pricing displays, factory-style photography.',
    zhDesc: '生成1688批发商品图片、批量定价展示、工厂风格摄影。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'factory:image:png:Factory Photo:工厂实拍:1200x800:false',
      'packaging:image:png:Packaging Details:包装细节:800x800:false',
      'moq-banner:image:png:MOQ & Price Banner:起订量价格:750x400:true',
      'title:text:txt:Product Title:商品标题:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:SEO Keywords:搜索关键词:0x0:true'
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:12|factory:Factory Photos:生成工厂实拍:15|detail:Detail Images:生成详情图:18|moq:Pricing Banner:生成定价图:8|listing:Generate Copy:生成文案:8|seo:Generate SEO:生成SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen,GPT Image:FLUX|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a 1688 wholesale product photography expert.:Product: {{product}}. Create 1688-style product images. Wholesale/industrial aesthetic, clean but not overly polished, showing real production quality.:',
    exportFormats: 'PNG,JPG,ZIP'
  },
  {
    id: 'aliexpress', en: 'AliExpress', zh: '速卖通',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'seo', 'marketplace'],
    platforms: ['AliExpress Global', 'AliExpress RU', 'AliExpress BR'],
    desc: 'Generate AliExpress cross-border product images, multi-language listings, global shipping assets.',
    zhDesc: '生成速卖通跨境商品图片、多语言商品页、全球发货素材。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'size-chart:image:png:Size Chart:尺码表:800x800:false',
      'promotion:image:png:Promotion Banner:促销横幅:1200x600:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Product Title (EN):商品标题英文:0x0:true',
      'title-cn:text:txt:Product Title (CN):商品标题中文:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:SEO Keywords:搜索关键词:0x0:true'
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|promotion:Promotion Banner:生成促销图:12|video:Product Video:生成视频:25|translate:Multi-Language:多语言翻译:10|listing:Generate Copy:生成文案:8|seo:Generate SEO:生成SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen:FLUX|video:Kling,Veo,Runway:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are an AliExpress cross-border e-commerce expert.:Product: {{product}}. Create AliExpress main images. International style, clean with space for multi-language text overlay.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: 'mercadolibre', en: 'Mercado Libre', zh: '美客多',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'marketplace'],
    platforms: ['Mercado Libre BR', 'Mercado Libre MX', 'Mercado Libre AR'],
    desc: 'Generate Mercado Libre product listings for Latin American markets. Spanish/Portuguese optimized assets.',
    zhDesc: '生成美客多拉美市场商品页面。西班牙语/葡萄牙语优化素材。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'mercadopago:image:png:Mercado Pago Banner:支付横幅:1200x400:false',
      'full:image:png:Full Shipment Banner:Full标识:750x400:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Title (ES/PT):标题ES/PT:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|video:Product Video:生成视频:25|listing:Generate Listing:生成商品页:10|export:Export:导出:5',
    models: 'image:FLUX,GPT Image:FLUX|video:Veo,Kling:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a Mercado Libre listing expert for Latin America.:Product: {{product}}. Create Mercado Libre product images in Spanish/Portuguese. Vibrant, trust-building style for LatAm consumers.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: 'ozon', en: 'Ozon', zh: 'Ozon',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'marketplace'],
    platforms: ['Ozon RU', 'Ozon Global'],
    desc: 'Generate Ozon marketplace assets for Russian and CIS markets. Cyrillic-optimized content.',
    zhDesc: '生成Ozon俄罗斯市场素材。西里尔字母优化内容。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'rich-content:image:png:Rich Content:丰富内容:1200x800:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Title (RU):标题RU:0x0:true',
      'description:text:txt:Description (RU):描述RU:0x0:true',
      'seo:text:txt:SEO Keywords (RU):搜索关键词RU:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|video:Product Video:生成视频:25|listing:Russian Listing:俄语页面生成:10|seo:Russian SEO:俄语SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen:FLUX|video:Veo,Kling:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are an Ozon marketplace expert for Russian e-commerce.:Product: {{product}}. Create Ozon product images. Clean, informative style suited for Russian consumers.:',
    exportFormats: 'PNG,JPG,ZIP'
  },
  {
    id: 'rakuten', en: 'Rakuten', zh: '乐天',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'marketplace'],
    platforms: ['Rakuten JP', 'Rakuten Global'],
    desc: 'Generate Rakuten Japan marketplace assets. Japanese-language optimized with Japanese design sensibilities.',
    zhDesc: '生成日本乐天市场素材。日语优化，日式设计美学。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'shop-page:image:png:Shop Page:店铺页面:1920x1080:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Title (JP):タイトル:0x0:true',
      'description:text:txt:Description (JP):商品説明:0x0:true',
      'seo:text:txt:SEO Keywords (JP):検索キーワード:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|video:Product Video:生成视频:25|listing:Japanese Listing:日语页面生成:10|seo:Japanese SEO:日语SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen:FLUX|video:Veo,Kling:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a Rakuten marketplace expert for Japanese e-commerce.:Product: {{product}}. Create Rakuten product images. Japanese design sensibility — clean, detailed, trustworthy. Include Japanese text space.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: 'coupang', en: 'Coupang', zh: 'Coupang',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'marketplace'],
    platforms: ['Coupang KR'],
    desc: 'Generate Coupang Korean marketplace assets. Rocket delivery optimized listings with Korean design.',
    zhDesc: '生成韩国Coupang市场素材。火箭配送优化商品页，韩式设计。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'rocket:image:png:Rocket Delivery Banner:火箭配送:750x400:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Title (KR):상품명:0x0:true',
      'description:text:txt:Description (KR):상세설명:0x0:true',
      'seo:text:txt:SEO Keywords (KR):검색 키워드:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|video:Product Video:生成视频:25|listing:Korean Listing:韩语页面生成:10|seo:Korean SEO:韩语SEO:8|export:Export:导出:5',
    models: 'image:FLUX,GPT Image:FLUX|video:Veo,Kling:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a Coupang marketplace expert for Korean e-commerce.:Product: {{product}}. Create Coupang product images. Korean aesthetic — clean, bright, trendy with emotional appeal.:',
    exportFormats: 'PNG,JPG,MP4,ZIP'
  },
  {
    id: 'flipkart', en: 'Flipkart', zh: 'Flipkart',
    cat: 'official',
    tags: ['image', 'video', 'copywriting', 'marketplace'],
    platforms: ['Flipkart IN'],
    desc: 'Generate Flipkart India marketplace assets. Optimized for Indian consumer preferences and multilingual needs.',
    zhDesc: '生成印度Flipkart市场素材。优化印度消费者偏好和多语言需求。',
    assets: [
      'main-image:image:png:Main Image:商品主图:800x800:true',
      'detail:image:png:Detail Images:详情图:800x1200:true',
      'festive:image:png:Festive Banner:节日横幅:1200x600:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Title (EN/HI):标题EN/HI:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:SEO Keywords:搜索关键词:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|detail:Detail Images:生成详情页:20|video:Product Video:生成视频:25|listing:Indian Listing:印度市场页面:10|seo:Indian SEO:印度市场SEO:8|export:Export:导出:5',
    models: 'image:FLUX,GPT Image:FLUX|video:Veo,Kling:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'main:Main Image:主图:You are a Flipkart marketplace expert for Indian e-commerce.:Product: {{product}}. Create Flipkart product images. Vibrant colors, value-focused presentation for Indian market.:',
    exportFormats: 'PNG,JPG,ZIP'
  },
  {
    id: 'pinterest', en: 'Pinterest', zh: 'Pinterest',
    cat: 'community',
    tags: ['image', 'social', 'ads'],
    platforms: ['Pinterest Shopping'],
    desc: 'Generate Pinterest-optimized pins: vertical product images, idea pins, shop-able content.',
    zhDesc: '生成Pinterest优化的Pin：竖版商品图、Idea Pin、可购物内容。',
    assets: [
      'pin-image:image:png:Standard Pin:标准Pin:1000x1500:true',
      'idea-pin:image:png:Idea Pin:Idea Pin:1000x1500:false',
      'carousel:image:png:Carousel Ad:轮播广告:1000x1500:false',
      'rich-pin:image:png:Rich Pin:Rich Pin:1000x1500:false',
      'description:text:txt:Pin Description:Pin描述:0x0:true',
      'hashtags:text:txt:Keywords:关键词:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|pin-image:Generate Standard Pin:生成标准Pin:10|idea-pin:Generate Idea Pin:生成Idea Pin:12|description:Pin Description:生成描述:5|hashtags:Generate Keywords:生成关键词:5|export:Export:导出:3',
    models: 'image:FLUX,GPT Image:FLUX|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o',
    prompts: 'pin:Pin Design:Pin设计:You are a Pinterest marketing expert.:Product: {{product}}. Create a Pinterest-optimized vertical pin. Inspirational aesthetic, text overlay with tips, lifestyle context for maximum saves.:',
    exportFormats: 'PNG,JPG,ZIP'
  },
  {
    id: 'generic', en: 'Generic Store', zh: '独立站通用',
    cat: 'community',
    tags: ['image', 'video', 'copywriting', 'seo', 'ads'],
    platforms: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Custom Store'],
    desc: 'Universal e-commerce assets for any online store. Flexible templates adaptable to any brand.',
    zhDesc: '通用电商素材，适用于任何独立站。灵活模板适配任意品牌。',
    assets: [
      'main-image:image:png:Main Product Image:商品主图:800x800:true',
      'lifestyle:image:png:Lifestyle Image:场景图:1200x800:true',
      'infographic:image:png:Infographic:信息图:800x1200:false',
      'banner:image:png:Store Banner:商店横幅:1920x500:false',
      'ad:image:png:Social Ad:社交广告:1080x1080:false',
      'video:video:mp4:Product Video:商品视频:0x0:false',
      'title:text:txt:Product Title:商品标题:0x0:true',
      'description:text:txt:Description:商品描述:0x0:true',
      'seo:text:txt:SEO Content:SEO内容:0x0:true',
    ],
    workflow: 'upload:Upload Product:上传商品:2|analyze:Analyze Product:AI 分析商品:5|main-image:Generate Main Image:生成主图:15|lifestyle:Generate Lifestyle:生成场景图:12|infographic:Generate Infographic:生成信息图:15|banner:Generate Banner:生成横幅:10|video:Generate Video:生成视频:25|listing:Generate Copy:生成文案:8|seo:Generate SEO:生成SEO:8|export:Export:导出:5',
    models: 'image:FLUX,Imagen,GPT Image:FLUX|video:Kling,Veo,Runway:Veo|text:GPT-4o,Claude:GPT-4o|seo:GPT-4o,Claude:GPT-4o|translation:GPT-4o,Gemini:GPT-4o',
    prompts: 'product:Product Image:商品图:You are an e-commerce product photography expert.:Product: {{product}}. Generate studio-quality product images with clean background.:',
    exportFormats: 'PNG,JPG,WEBP,MP4,ZIP'
  },
];

function parseAsset(s) {
  const [id,type,format,name,zhName,sizeReq,required] = s.split(':');
  const [w,h] = (sizeReq || '800x800').split('x');
  return `    { id: '${id}', type: '${type}', format: '${format}', name: '${name}', zhName: '${zhName}', width: ${w !== '0' ? parseInt(w) : 'undefined'}, height: ${h !== '0' ? parseInt(h) : 'undefined'}, required: ${required === 'true'} }`;
}

function parseWorkflow(s) {
  return s.split('|').map(step => {
    const [id,label,zhLabel,sec] = step.split(':');
    return `    { id: '${id}', label: '${label}', zhLabel: '${zhLabel}', estimatedSeconds: ${sec} }`;
  }).join(',\n');
}

function parseModels(s) {
  return s.split('|').map(m => {
    const [task,models,pref] = m.split(':');
    return `    { task: '${task}', models: [${models.split(',').map(x=>`'${x}'`).join(', ')}], preferred: '${pref}' }`;
  }).join(',\n');
}

function parsePrompts(s) {
  if (!s) return '';
  return s.split('|').map(p => {
    const [id,task,zhTask,sysPrompt,userPrompt] = p.split(':');
    return `    { id: '${id}', task: '${task}', zhTask: '${zhTask}', systemPrompt: '${sysPrompt}', userPromptTemplate: '${userPrompt || `Product: {{product}}.`}' }`;
  }).join(',\n');
}

for (const p of platforms) {
  const code = `import { PlatformSkill } from '../types';

export const ${p.id}Skill: PlatformSkill = {
  type: 'platform',
  id: '${p.id}',
  name: '${p.en}',
  zhName: '${p.zh}',
  category: '${p.cat}',
  tags: ${JSON.stringify(p.tags)},
  icon: '${p.id === '1688' ? 'Building2' : p.id === 'generic' ? 'Globe' : 'ShoppingBag'}',
  platforms: ${JSON.stringify(p.platforms)},
  description: '${p.desc}',
  zhDescription: '${p.zhDesc}',
  supportedAssets: [
${p.assets.map(parseAsset).join(',\n')}
  ],
  workflow: [
${parseWorkflow(p.workflow)}
  ],
  recommendedModels: [
${parseModels(p.models)}
  ],
  promptTemplates: [
${parsePrompts(p.prompts)}
  ],
  exportFormats: [${p.exportFormats.split(',').map(x=>`'${x}'`).join(', ')}],
};
`;
  const filePath = path.join(BASE, `${p.id}.ts`);
  fs.writeFileSync(filePath, code);
}

// Update index.ts to include new skills
const barrelLines = platforms.map(p => `export { ${p.id}Skill } from './${p.id}';`);
console.log(`✅ Generated ${platforms.length} new platforms`);
// Print barrel entries for copy-paste
console.log('\n--- Barrel entries ---');
console.log(barrelLines.join('\n'));
