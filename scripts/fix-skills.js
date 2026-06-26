const fs = require('fs');
const path = require('path');

const dirs = ['amazon','shopify','shopee','temu','tiktok','lazada','ebay','etsy','walmart','facebook','instagram','xiaohongshu','taobao','douyin'];

for (const d of dirs) {
  const fp = path.join(__dirname, '..', 'src', 'skills', d, 'index.ts');
  let content = fs.readFileSync(fp, 'utf8');
  
  // Replace Skill with PlatformSkill
  content = content.replace(/: Skill = \{/, ': PlatformSkill = {');
  
  // Add type: 'platform' after the opening brace
  content = content.replace(
    /: PlatformSkill = \{/,
    ': PlatformSkill = {\n  type: \'platform\' as const,'
  );
  
  fs.writeFileSync(fp, content);
  console.log(`✅ ${d}`);
}
console.log('Done!');
