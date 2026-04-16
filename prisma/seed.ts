import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const drinks = [
  {
    name: '茅台',
    nameEn: 'Moutai',
    description: '酱香型白酒的代表，以其独特的酱香、醇厚的口感闻名于世。',
    abv: 53,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400',
    tags: JSON.stringify(['白酒', '酱香型', '高端', '国酒']),
    rating: 4.9
  },
  {
    name: '威士忌',
    nameEn: 'Whisky',
    description: '来自苏格兰的经典烈酒，琥珀色泽，烟熏泥煤风味，回味悠长。',
    abv: 40,
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400',
    tags: JSON.stringify(['洋酒', '威士忌', '烈酒', '经典']),
    rating: 4.6
  },
  {
    name: '红酒',
    nameEn: 'Red Wine',
    description: '法国波尔多产区的赤霞珠，口感饱满，单宁柔顺，果香浓郁。',
    abv: 13.5,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
    tags: JSON.stringify(['葡萄酒', '红酒', '干红', '优雅']),
    rating: 4.5
  },
  {
    name: '清酒',
    nameEn: 'Sake',
    description: '日本纯米大吟酿，米香清雅，口感细腻顺滑，回味甘甜。',
    abv: 15,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400',
    tags: JSON.stringify(['清酒', '日式', '米酒', '清雅']),
    rating: 4.4
  },
  {
    name: '啤酒',
    nameEn: 'Beer',
    description: '德国原装进口小麦啤酒，金黄透亮，泡沫丰富，麦香四溢。',
    abv: 5,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400',
    tags: JSON.stringify(['啤酒', '小麦', '清爽', '畅饮']),
    rating: 4.2
  },
  {
    name: '金酒',
    nameEn: 'Gin',
    description: '英式干金酒，杜松子香气清新，带有淡淡的柑橘和香料味道。',
    abv: 40,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
    tags: JSON.stringify(['金酒', '鸡尾酒基酒', '杜松子', '清新']),
    rating: 4.3
  },
  {
    name: '龙舌兰',
    nameEn: 'Tequila',
    description: '墨西哥高端龙舌兰酒，银色款，清冽爽口，带有独特的植物香气。',
    abv: 38,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    tags: JSON.stringify(['龙舌兰', '墨西哥', '烈酒', '热情']),
    rating: 4.4
  },
  {
    name: '香槟',
    nameEn: 'Champagne',
    description: '法国顶级香槟，气泡细腻绵密，口感清新优雅，适合庆祝时刻。',
    abv: 12,
    image: 'https://images.unsplash.com/photo-1594372365401-3b5ff14eaaed?w=400',
    tags: JSON.stringify(['香槟', '起泡酒', '庆祝', '奢华']),
    rating: 4.8
  }
]

async function main() {
  console.log('Start seeding drinks...')
  
  for (const drink of drinks) {
    await prisma.drink.create({
      data: drink
    })
    console.log(`Created drink: ${drink.name}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
