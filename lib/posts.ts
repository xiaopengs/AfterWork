import { moodEmojis, moodColors } from './drinks-data';

// 心情分类数据
export const moodCategories = [
  '全部',
  '温暖',
  '深思',
  '俏皮',
  '荒诞',
  '裂隙',
  '分裂',
  '脆弱',
  '猎奇',
  '苦甜',
] as const;

export type MoodCategory = typeof moodCategories[number];

// 帖子接口
export interface Post {
  id: string;
  mood: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  author: string; // 匿名酒客名称
  drink?: string; // 可选的酒名
}

// 模拟帖子数据（15-20条真实感内容）
export const posts: Post[] = [
  {
    id: '1',
    mood: '温暖',
    content: '今晚点了「琥珀慢拍」，听调酒师聊起他刚开始学调酒的故事。灯光昏黄得像旧照片，突然觉得这座城市的陌生人也没那么疏远。',
    likes: 128,
    comments: 15,
    author: '琥珀色的人',
    createdAt: '5分钟前',
    drink: '琥珀慢拍',
  },
  {
    id: '2',
    mood: '深思',
    content: '凌晨两点，坐在吧台最角落的位置。隔壁的陌生人突然问：「你相信平行宇宙吗？」然后我们聊到了天亮。酒馆是个奇怪的地方，让萍水相逢变得理所当然。',
    likes: 342,
    comments: 28,
    author: '失眠的猫',
    createdAt: '30分钟前',
  },
  {
    id: '3',
    mood: '俏皮',
    content: '喝了一杯「春苔气泡」，突然想给三年前删除的微信好友发消息，问问他最近还好不好。当然，我没有。',
    likes: 89,
    comments: 12,
    author: '薄荷味的梦',
    createdAt: '1小时前',
    drink: '春苔气泡',
  },
  {
    id: '4',
    mood: '裂隙',
    content: '「灵魂伏特加」喝到第三口的时候，突然分不清此刻的我，和十分钟前的我，是不是同一个人了。有点可怕，但也有点自由。',
    likes: 201,
    comments: 19,
    author: '裂成两半的影子',
    createdAt: '2小时前',
    drink: '灵魂伏特加',
  },
  {
    id: '5',
    mood: '脆弱',
    content: '今天被裁了。不想回家，就来这里坐坐。调酒师给我推荐了「死线龙舌兰」，说「崩溃边缘最清醒」。我信了。',
    likes: 567,
    comments: 63,
    author: '加班到失业的人',
    createdAt: '3小时前',
    drink: '死线龙舌兰',
  },
  {
    id: '6',
    mood: '荒诞',
    content: '我和我的影子吵了一架。它说我太消极，我说是它太乐观。最后我们碰了个杯，冰块撞击的声音像笑声。',
    likes: 156,
    comments: 22,
    author: '喝多了的哲学系',
    createdAt: '4小时前',
  },
  {
    id: '7',
    mood: '苦甜',
    content: '「柑橘防火墙」果然名不虚传。酸得清醒，甜得温柔。今天终于把那封写了三年的邮件发出去了，管它回不回呢。',
    likes: 234,
    comments: 31,
    author: '终于发了邮件的人',
    createdAt: '5小时前',
    drink: '柑橘防火墙',
  },
  {
    id: '8',
    mood: '温暖',
    content: '第一次带爸妈来喝酒。他们居然点了「纯粹派」，说茅台配威士忌很对味。我好像从来不了解他们年轻时候的故事。',
    likes: 892,
    comments: 74,
    author: '长大了的孩子',
    createdAt: '6小时前',
    drink: '纯粹派',
  },
  {
    id: '9',
    mood: '深思',
    content: '翻开笔记本，发现去年今天写的愿望一个都没实现。但奇怪的是，我并不难过。也许愿望本身就是用来被遗忘的吧。',
    likes: 178,
    comments: 25,
    author: '时间旅行者',
    createdAt: '昨天',
  },
  {
    id: '10',
    mood: '分裂',
    content: '「虫洞白兰地」让我同时想发朋友圈和删掉所有朋友圈。它们吵了一整晚，最后达成共识：发一条仅自己可见。',
    likes: 445,
    comments: 38,
    author: '双重人格的酒客',
    createdAt: '昨天',
    drink: '虫洞白兰地',
  },
  {
    id: '11',
    mood: '猎奇',
    content: '点了「深海电鳗伏特加」，喝完感觉大脑被电击了0.5秒。那一瞬间我看到了宇宙的源代码，但我忘了。',
    likes: 312,
    comments: 47,
    author: '失忆的宇宙学家',
    createdAt: '昨天',
    drink: '深海电鳗伏特加',
  },
  {
    id: '12',
    mood: '俏皮',
    content: '「纸灯清酒」喝到微醺，给前任发了条消息：「你上次说想喝的那家店，我帮你尝了，还行。」他回：「谢谢。」就一个字。但我开心了一整晚。',
    likes: 678,
    comments: 89,
    author: '和解中的前任',
    createdAt: '昨天',
    drink: '纸灯清酒',
  },
  {
    id: '13',
    mood: '裂隙',
    content: '「裂隙威士忌」喝到一半，突然能理解为什么有些人会爱上不该爱的人了。有些味道，就是会让你说出不该说的话。',
    likes: 234,
    comments: 18,
    author: '不该说的话',
    createdAt: '2天前',
    drink: '裂隙威士忌',
  },
  {
    id: '14',
    mood: '温暖',
    content: '今天是店庆，所有酒打八折。认识了三年的酒友终于加上了微信，原来他也一直想加。希望我们能成为现实中的朋友。',
    likes: 523,
    comments: 41,
    author: '终于加上微信的酒友',
    createdAt: '2天前',
  },
  {
    id: '15',
    mood: '脆弱',
    content: '养了五年的猫走了。不想一个人待着，就来这里坐着。「天际线朗姆」让我把目光抬高了一点点，看到窗外的云还挺好看。',
    likes: 1203,
    comments: 156,
    author: '失去猫咪的人',
    createdAt: '2天前',
    drink: '天际线朗姆',
  },
  {
    id: '16',
    mood: '荒诞',
    content: '「全息苦艾」让我写了一首关于「0」和「1」的爱情诗。写完觉得自己是天才，第二天再看觉得是垃圾。但那晚的自己是自由的。',
    likes: 289,
    comments: 33,
    author: '诗人与代码',
    createdAt: '3天前',
    drink: '全息苦艾',
  },
  {
    id: '17',
    mood: '深思',
    content: '和调酒师聊起「除错玛格丽特」的名字来源。他说，每一杯酒都是对生活的调试，酸是bug，盐是眼泪，青柠是解药。',
    likes: 456,
    comments: 52,
    author: '生活的调试者',
    createdAt: '3天前',
    drink: '除错玛格丽特',
  },
  {
    id: '18',
    mood: '苦甜',
    content: '「黑冰味美思」入口冷，余味热。像极了刚结束的那段关系，表面冷漠，内心滚烫。好聚好散，各自安好。',
    likes: 378,
    comments: 29,
    author: '刚分手的酒客',
    createdAt: '4天前',
    drink: '黑冰味美思',
  },
  {
    id: '19',
    mood: '俏皮',
    content: '"闲疯气泡"果然是周末必备。一口下去，满肚子的「这周干了啥」「下周要干啥」全变成了「管他呢」。',
    likes: 167,
    comments: 14,
    author: '周末发疯选手',
    createdAt: '4天前',
    drink: '闲疯气泡',
  },
  {
    id: '20',
    mood: '深思',
    content: '「最后一杯苦艾」喝完了，却一直在说再见。说给这个城市，说给加班的三年，说给那个还没来得及告别的自己。',
    likes: 534,
    comments: 67,
    author: '告别综合症',
    createdAt: '5天前',
    drink: '最后一杯苦艾',
  },
];

// 获取心情emoji
export const getMoodEmoji = (mood: string): string => {
  return moodEmojis[mood] || '🍷';
};

// 获取心情颜色
export const getMoodColor = (mood: string): string => {
  return moodColors[mood] || '#8B2942';
};

// 按心情筛选帖子
export const filterPostsByMood = (mood: string): Post[] => {
  if (mood === '全部' || !mood) return posts;
  return posts.filter((post) => post.mood === mood);
};
