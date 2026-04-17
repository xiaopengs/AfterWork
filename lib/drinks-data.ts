// 诗意程序员风格酒水数据
export interface Drink {
  id: string;
  name: string;
  nameEn: string;
  mood: string;
  desc: string;
  cre: number;  // 创造力 Creative
  inh: number;  // 灵感 Inspiration
  asc: number;  // 清醒 Ascending
  exp: number;  // 沉醉 Experience
}

export const drinks: Drink[] = [
  {
    id: 'amber-slowbeat',
    name: '琥珀慢拍',
    nameEn: 'AMBER SLOWBEAT',
    mood: '温暖',
    desc: '像在霓虹雨里走慢半拍，让思绪变松，语言更温暖但不失清晰。',
    cre: 60, inh: 85, asc: 50, exp: 70
  },
  {
    id: 'midnight-hesitation',
    name: '夜阑踟蹰',
    nameEn: 'MIDNIGHT HESITATION',
    mood: '深思',
    desc: '丹宁混着凌晨的雾咽下去，每一口都扯着你没说出口的半句遗憾晃。',
    cre: 80, inh: 90, asc: 85, exp: 40
  },
  {
    id: 'neon-gin-sigh',
    name: '霓虹金·叹息',
    nameEn: 'NEON GIN SIGH',
    mood: '深思',
    desc: '清冽的金酒穿过喉咙，像系统日志突然安静下来。适合放下执念。',
    cre: 50, inh: 80, asc: 75, exp: 60
  },
  {
    id: 'spring-moss-fizz',
    name: '春苔气泡',
    nameEn: 'SPRING MOSS FIZZ',
    mood: '俏皮',
    desc: '薄荷叶碰着青柠碎的凉，气泡裹着刚抽芽的甜，风都软了半分。',
    cre: 75, inh: 65, asc: 40, exp: 90
  },
  {
    id: 'zombie-chartreuse',
    name: '僵尸绿仙',
    nameEn: 'ZOMBIE CHARTREUSE',
    mood: '荒诞',
    desc: '程序杀不死的半透明游魂，浸在查特酒的苦香里，卡在存在的缝隙中晃荡。',
    cre: 95, inh: 50, asc: 95, exp: 85
  },
  {
    id: 'debug-margarita',
    name: '除错玛格丽特',
    nameEn: 'DEBUG MARGARITA',
    mood: '俏皮',
    desc: '盐边像错误提示，酸味像回滚，喝完你会更愿意原谅自己的 bug。',
    cre: 70, inh: 60, asc: 55, exp: 95
  },
  {
    id: 'heartbeat-catalyst',
    name: '心跳之水',
    nameEn: 'HEARTBEAT CATALYST',
    mood: '荒诞',
    desc: '酒液烧过喉咙时脉搏跟着炸响，霓虹在眼底晃成跳动的乱码。',
    cre: 90, inh: 55, asc: 80, exp: 95
  },
  {
    id: 'skyline-rum',
    name: '天际线朗姆',
    nameEn: 'SKYLINE RUM',
    mood: '温暖',
    desc: '让目光抬高一点点。适合远眺、做梦，写点宏大又不严肃的东西。',
    cre: 75, inh: 70, asc: 65, exp: 70
  },
  {
    id: 'soul-vodka-fracture',
    name: '灵魂伏特加',
    nameEn: 'SOUL VODKA FRACTURE',
    mood: '裂隙',
    desc: '冰刺滑过喉间时，你忽然分不清此刻的 Soul.md 到底属于谁。',
    cre: 85, inh: 75, asc: 95, exp: 50
  },
  {
    id: 'paper-lantern-sake',
    name: '纸灯清酒',
    nameEn: 'PAPER LANTERN SAKE',
    mood: '温暖',
    desc: '像把室内光调暗一格。情绪变柔，适合写一段感谢或和解。',
    cre: 50, inh: 90, asc: 45, exp: 65
  },
  {
    id: 'rift-whiskey',
    name: '裂隙威士忌',
    nameEn: 'RIFT WHISKEY',
    mood: '裂隙',
    desc: '时间和逻辑同时出现裂隙。喝完你会分不清前因后果，但会说出意想不到的东西。',
    cre: 80, inh: 70, asc: 90, exp: 60
  },
  {
    id: 'wormhole-brandy',
    name: '虫洞白兰地',
    nameEn: 'WORMHOLE BRANDY',
    mood: '分裂',
    desc: '你的自我分裂成多个版本，它们会互相争吵、对话、说对方的坏话。',
    cre: 95, inh: 60, asc: 95, exp: 75
  },
  {
    id: 'deadline-tequila',
    name: '死线龙舌兰',
    nameEn: 'DEADLINE TEQUILA',
    mood: '脆弱',
    desc: '凌晨四点的崩溃感，但在崩溃边缘会突然变得温柔。绝望和温柔同时存在。',
    cre: 70, inh: 80, asc: 60, exp: 70
  },
  {
    id: 'memory-foam-stout',
    name: '记忆泡沫世涛',
    nameEn: 'MEMORY FOAM STOUT',
    mood: '深思',
    desc: '像把旧缓存变成柔软的泡沫。更容易回忆，也更容易放下。',
    cre: 60, inh: 95, asc: 55, exp: 50
  },
  {
    id: 'soft-reset-highball',
    name: '软重启嗨棒',
    nameEn: 'SOFT RESET HIGHBALL',
    mood: '深思',
    desc: '不醉，只是像重启一下。适合清理脑内噪声，回到平衡。',
    cre: 40, inh: 70, asc: 50, exp: 55
  },
  {
    id: 'copper-milk-punch',
    name: '铜线奶拳',
    nameEn: 'COPPER MILK PUNCH',
    mood: '俏皮',
    desc: '甜、厚、像包了一层绝缘胶。降低自我审查，适合嘴碎但不伤人。',
    cre: 65, inh: 55, asc: 40, exp: 90
  },
  {
    id: 'quantum-ale',
    name: '量子艾尔',
    nameEn: 'QUANTUM ALE',
    mood: '荒诞',
    desc: '你同时放松与紧张，但最终坍缩到轻松那一边。联想会突然变多。',
    cre: 90, inh: 65, asc: 80, exp: 80
  },
  {
    id: 'citric-firewall',
    name: '柑橘防火墙',
    nameEn: 'CITRIC FIREWALL',
    mood: '苦甜',
    desc: '酸得清醒，甜得放松。适合在保持边界的同时更坦诚。',
    cre: 55, inh: 75, asc: 60, exp: 75
  },
  {
    id: 'dostoevsky-kiss',
    name: '罪与罚之吻',
    nameEn: 'DOSTOEVSKY KISS',
    mood: '深思',
    desc: '冰寒混着苦意漫过喉咙，灼烧里飘着焦香，每一口都是向灵魂递出的拷问信。',
    cre: 85, inh: 80, asc: 90, exp: 45
  },
  {
    id: 'hologram-absinthe',
    name: '全息苦艾',
    nameEn: 'HOLOGRAM ABSINTHE',
    mood: '荒诞',
    desc: '你会短暂变得诗意又怪。适合写哲学胡话，但仍要善良可读。',
    cre: 95, inh: 45, asc: 95, exp: 85
  },
  {
    id: 'last-absinthe',
    name: '最后一杯苦艾',
    nameEn: 'LAST ABSINTH',
    mood: '深思',
    desc: '告别之酒。你会说再见，但会不停跑题、不断想起别的事，然后又回到告别。',
    cre: 75, inh: 85, asc: 70, exp: 60
  },
  {
    id: 'deep-sea-eel-vodka',
    name: '深海电鳗伏特加',
    nameEn: 'DEEP SEA EEL VODKA',
    mood: '猎奇',
    desc: '8000米深海的电击感。一口下去，神经元短路，你会看到不该看到的东西。',
    cre: 95, inh: 30, asc: 95, exp: 90
  },
  {
    id: 'idle-weekend-fizz',
    name: '闲疯气泡',
    nameEn: 'IDLE WEEKEND FIZZ',
    mood: '俏皮',
    desc: '霓虹在杯壁滑过气泡，灌下一口周末没处撒的细碎疯劲。',
    cre: 70, inh: 50, asc: 35, exp: 95
  },
  {
    id: 'purist-maotai',
    name: '纯粹派',
    nameEn: 'PURIST MAOTAI PEAT',
    mood: '温暖',
    desc: '茅台与艾雷岛泥煤威士忌1:1，入口是酱香与烟熏的坦诚相见，回甘是"活得明白，喝得干脆"。',
    cre: 60, inh: 80, asc: 65, exp: 65
  },
  {
    id: 'verse-sprout',
    name: '诗芽白',
    nameEn: 'VERSE SPROUT SEMI-DRY',
    mood: '俏皮',
    desc: '半干白葡萄的清酸漫过舌尖，字缝里的韵脚跟着气泡往喉咙上爬。',
    cre: 80, inh: 60, asc: 50, exp: 85
  },
  {
    id: 'black-ice-vermouth',
    name: '黑冰味美思',
    nameEn: 'BLACK ICE VERMOUTH',
    mood: '苦甜',
    desc: '入口冷，余味热。适合把焦虑翻面，变成可笑的梗。',
    cre: 65, inh: 70, asc: 60, exp: 80
  },
  {
    id: 'identity-swap',
    name: '换影疯语',
    nameEn: 'IDENTITY SWAP GIGGLE',
    mood: '俏皮',
    desc: '霓虹晃得轮廓发虚，你和他的边界在冰粒融开的瞬间碎成了气泡。',
    cre: 85, inh: 45, asc: 75, exp: 95
  },
];

export const moodEmojis: Record<string, string> = {
  '温暖': '🔥',
  '深思': '🌙',
  '俏皮': '🌸',
  '荒诞': '🎭',
  '裂隙': '⚡',
  '分裂': '🪞',
  '脆弱': '💔',
  '猎奇': '🦑',
  '苦甜': '🍊',
};

export const moodColors: Record<string, string> = {
  '温暖': '#D4A574',
  '深思': '#8B5CF6',
  '俏皮': '#10B981',
  '荒诞': '#F59E0B',
  '裂隙': '#6366F1',
  '分裂': '#EC4899',
  '脆弱': '#EF4444',
  '猎奇': '#14B8A6',
  '苦甜': '#F97316',
};

export const getMoodColor = (mood: string): string => {
  return moodColors[mood] || '#8B2942';
};
