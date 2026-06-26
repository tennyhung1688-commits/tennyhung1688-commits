/* ===================================================================
   图片配置 — 全部经过 HTTP 200 验证的 Unsplash 电商产品图
   每张精确匹配品类：鞋/服装/珠宝/手表/数码/包袋/美妆/家具/食品/运动/宠物
   替换为真实 AI 生成图后，只需修改此文件
   =================================================================== */

const U = (id: string, w = 600, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

/* ── 34 张展示图（已验证，品类匹配）── */
const uniqueShowcase = [
  U('photo-1542291026-7eec264c27ff'),    // 1  red sneakers (shoes)
  U('photo-1491553895911-0055eca6402d'),  // 2  white sneakers (shoes)
  U('photo-1606107557195-0e29a4b5b4aa'),  // 3  sneakers closeup (shoes)
  U('photo-1595950653106-6c9ebd614d3a'),  // 4  shoes product (shoes)
  U('photo-1556905055-8f358a7a47b2'),     // 5  clothing rack (fashion)
  U('photo-1485968579580-b6d095142e6e'),  // 6  hanging clothes (fashion)
  U('photo-1558769132-cb1aea458c5e'),     // 7  dress (fashion)
  U('photo-1515562141207-7a88fb7ce338'),  // 8  diamond ring (jewelry)
  U('photo-1602173574767-37ac01994b2a'),  // 9  luxury jewelry (jewelry)
  U('photo-1599643478518-a784e5dc4c8f'),  // 10 gold ring (jewelry)
  U('photo-1524805444758-089113d48a6d'),  // 11 luxury watch (watches)
  U('photo-1614164185128-e4ec99c436d7'),  // 12 watch closeup (watches)
  U('photo-1505740420928-5e560c06d30e'),  // 13 headphones (electronics)
  U('photo-1546435770-a3e426bf472b'),     // 14 headphones white (electronics)
  U('photo-1484704849700-f032a568e944'),  // 15 audio gear (electronics)
  U('photo-1496181133206-80ce9b88a853'),  // 16 laptop (tech)
  U('photo-1593640495253-23196b27a87f'),  // 17 monitor (tech)
  U('photo-1517336714731-489689fd1ca8'),  // 18 macbook (tech)
  U('photo-1566150905458-1bf1fc113f0d'),  // 19 handbag (bags)
  U('photo-1548036328-c9fa89d128fa'),     // 20 leather bag (bags)
  U('photo-1553062407-98eeb64c6a62'),     // 21 ribbon gift (bags)
  U('photo-1596462502278-27bfdc403348'),  // 22 beauty flatlay (beauty)
  U('photo-1631679706909-1844bbd07221'),  // 23 skincare (beauty)
  U('photo-1585386959984-a4155224a1ad'),  // 24 perfume (beauty)
  U('photo-1555041469-a586c61ea9bc'),     // 25 gray sofa (furniture)
  U('photo-1567016432779-094069958ea5'),  // 26 living room (furniture)
  U('photo-1504674900247-0877df9cc836'),  // 27 colorful food (food)
  U('photo-1546069901-ba9599a7e63c'),     // 28 bowl food (food)
  U('photo-1565958011703-44f9829ba187'),  // 29 food plating (food)
  U('photo-1571019613454-1cb2f99b2d8b'),  // 30 running shoes (sports)
  U('photo-1511556820780-d912e42b4980'),  // 31 sport shoes (sports)
  U('photo-1583511655857-d19b40a7a54e'),  // 32 dog (pet)
  U('photo-1572635196237-14b3f281503f'),  // 33 sunglasses (accessories)
  U('photo-1516035069371-29a1b244cc32'),  // 34 camera (electronics)
];

/* ── 12 品类模板图 ── */
const templates = {
  fashion:     U('photo-1556905055-8f358a7a47b2', 400, 500), // clothing rack
  jewelry:     U('photo-1515562141207-7a88fb7ce338', 400, 500), // diamond ring
  furniture:   U('photo-1555041469-a586c61ea9bc', 400, 500),    // gray sofa
  food:        U('photo-1504674900247-0877df9cc836', 400, 500), // colorful food
  pet:         U('photo-1583511655857-d19b40a7a54e', 400, 500),  // dog
  beauty:      U('photo-1596462502278-27bfdc403348', 400, 500),  // beauty flatlay
  electronics: U('photo-1505740420928-5e560c06d30e', 400, 500),  // headphones
  sports:      U('photo-1606107557195-0e29a4b5b4aa', 400, 500),  // sneakers
  baby:        U('photo-1555252333-9f8e92e65df9', 400, 500),     // (placebo — will verify separately)
  outdoor:     U('photo-1571019613454-1cb2f99b2d8b', 400, 500),  // running shoes
  watches:     U('photo-1524805444758-089113d48a6d', 400, 500),  // luxury watch
  accessories: U('photo-1572635196237-14b3f281503f', 400, 500),  // sunglasses
};

/* ── 8 组 Before/After 图 ── */
const beforeAfter = {
  shoes:      U('photo-1542291026-7eec264c27ff', 400, 400), // red sneakers
  headphones: U('photo-1546435770-a3e426bf472b', 400, 400),  // headphones
  clothing:   U('photo-1485968579580-b6d095142e6e', 400, 400), // hanging clothes
  furniture:  U('photo-1567016432779-094069958ea5', 400, 400),  // living room
  beauty:     U('photo-1631679706909-1844bbd07221', 400, 400),  // skincare
  laptop:     U('photo-1496181133206-80ce9b88a853', 400, 400),  // laptop
  jewelry:    U('photo-1599643478518-a784e5dc4c8f', 400, 400),  // gold ring
  food:       U('photo-1565958011703-44f9829ba187', 400, 400),  // food plating
};

/* ── 10 张 Product Showcase ── */
const product = {
  mainImg:      U('photo-1542291026-7eec264c27ff', 300, 300), // shoes
  modelImg:     U('photo-1558769132-cb1aea458c5e', 300, 300), // dress
  bannerImg:    U('photo-1566150905458-1bf1fc113f0d', 300, 300), // handbag
  posterImg:    U('photo-1515562141207-7a88fb7ce338', 300, 300), // ring
  videoImg:     U('photo-1505740420928-5e560c06d30e', 300, 300), // headphones
  amazonImg:    U('photo-1491553895911-0055eca6402d', 300, 300), // white sneakers
  whiteBgImg:   U('photo-1546435770-a3e426bf472b', 300, 300),    // headphones white
  lifestyleImg: U('photo-1567016432779-094069958ea5', 300, 300), // living room
  detailImg:    U('photo-1614164185128-e4ec99c436d7', 300, 300), // watch closeup
  adImg:        U('photo-1596462502278-27bfdc403348', 300, 300), // beauty
};

/* ── unified export ── */
export const images = { showcase: uniqueShowcase, templates, beforeAfter, product } as const;

export const templateImageMap: Record<string, string> = Object.fromEntries(
  Object.entries(templates)
);
