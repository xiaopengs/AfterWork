// 21点游戏核心逻辑 - BlackJack Game Logic

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
  hidden?: boolean;
}

export type GamePhase = 'betting' | 'playing' | 'dealer' | 'result';

export type GameResult = 'player_win' | 'dealer_win' | 'push' | 'blackjack' | null;

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  phase: GamePhase;
  playerScore: number;
  dealerScore: number;
  bet: number;
  drinks: number;
  result: GameResult;
  message: string;
}

// 牌面定义
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

// 获取牌面值
export function getCardValue(rank: Rank): number {
  if (rank === 'A') return 11;
  if (['K', 'Q', 'J'].includes(rank)) return 10;
  return parseInt(rank);
}

// 计算手牌分数（智能处理A）
export function calculateScore(hand: Card[]): number {
  let score = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.hidden) continue;
    score += card.value;
    if (card.rank === 'A') aces++;
  }

  // 调整A的值以避免爆牌
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

// 检查是否为 Blackjack
export function isBlackjack(hand: Card[]): boolean {
  return hand.length === 2 && calculateScore(hand) === 21;
}

// 检查是否爆牌
export function isBusted(hand: Card[]): boolean {
  return calculateScore(hand) > 21;
}

// 创建一副牌
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        suit,
        rank,
        value: getCardValue(rank),
      });
    }
  }
  return shuffleDeck(deck);
}

// 洗牌
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 发一张牌
export function dealCard(deck: Card[]): { card: Card; deck: Card[] } {
  const newDeck = [...deck];
  const card = newDeck.pop()!;
  return { card, deck: newDeck };
}

// 初始化游戏
export function initializeGame(bet: number = 10): GameState {
  const deck = createDeck();
  
  // 发牌给玩家
  let { card: card1, deck: deck1 } = dealCard(deck);
  let { card: card2, deck: deck2 } = dealCard(deck1);
  const playerHand = [card1, card2];
  
  // 发牌给庄家
  let { card: dealerCard1, deck: deck3 } = dealCard(deck2);
  let { card: dealerCard2, deck: deck4 } = dealCard(deck3);
  dealerCard2.hidden = true; // 庄家第二张牌隐藏
  const dealerHand = [dealerCard1, dealerCard2];
  
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  // 检查初始 BlackJack
  if (isBlackjack(playerHand)) {
    dealerCard2.hidden = false;
    return {
      deck: deck4,
      playerHand,
      dealerHand,
      phase: 'result',
      playerScore: 21,
      dealerScore: calculateScore(dealerHand),
      bet,
      drinks: 0,
      result: 'blackjack',
      message: '🎰 Blackjack! 你赢了!',
    };
  }

  return {
    deck: deck4,
    playerHand,
    dealerHand,
    phase: 'betting',
    playerScore,
    dealerScore,
    bet,
    drinks: 0,
    result: null,
    message: `你的点数: ${playerScore}`,
  };
}

// 玩家要牌
export function hit(state: GameState): GameState {
  const { card, deck } = dealCard(state.deck);
  const newHand = [...state.playerHand, card];
  const newScore = calculateScore(newHand);

  if (isBusted(newHand)) {
    return {
      ...state,
      deck,
      playerHand: newHand,
      playerScore: newScore,
      phase: 'result',
      result: 'dealer_win',
      message: '💥 爆牌了! 你输了',
    };
  }

  return {
    ...state,
    deck,
    playerHand: newHand,
    playerScore: newScore,
    message: `你的点数: ${newScore}`,
  };
}

// 玩家停牌
export function stand(state: GameState): GameState {
  // 翻开庄家所有牌
  const dealerHand = state.dealerHand.map(card => ({ ...card, hidden: false }));
  
  let currentDeck = state.deck;
  let currentDealerHand = [...dealerHand];
  
  // 庄家规则：<=16 必须要牌，>=17 停牌
  while (calculateScore(currentDealerHand) < 17) {
    const { card, deck } = dealCard(currentDeck);
    currentDealerHand.push(card);
    currentDeck = deck;
  }

  const finalDealerScore = calculateScore(currentDealerHand);
  const finalPlayerScore = state.playerScore;
  const dealerBusted = isBusted(currentDealerHand);

  let result: GameResult;
  let message: string;

  if (dealerBusted) {
    result = 'player_win';
    message = `庄家爆牌(${finalDealerScore})，你赢了!`;
  } else if (finalPlayerScore > finalDealerScore) {
    result = 'player_win';
    message = `你(${finalPlayerScore}) > 庄家(${finalDealerScore})，你赢了!`;
  } else if (finalPlayerScore < finalDealerScore) {
    result = 'dealer_win';
    message = `你(${finalPlayerScore}) < 庄家(${finalDealerScore})，你输了`;
  } else {
    result = 'push';
    message = `平局! (${finalPlayerScore})`;
  }

  return {
    ...state,
    deck: currentDeck,
    dealerHand: currentDealerHand,
    dealerScore: finalDealerScore,
    phase: 'result',
    result,
    message,
  };
}

// 双倍下注
export function double(state: GameState): GameState {
  const { card, deck } = dealCard(state.deck);
  const newHand = [...state.playerHand, card];
  const newScore = calculateScore(newHand);

  if (isBusted(newHand)) {
    return {
      ...state,
      deck,
      playerHand: newHand,
      playerScore: newScore,
      phase: 'result',
      result: 'dealer_win',
      message: '💥 爆牌了! 你输了',
    };
  }

  // 双倍后自动停牌
  return stand({
    ...state,
    deck,
    playerHand: newHand,
    playerScore: newScore,
    bet: state.bet * 2,
  });
}

// 获取花色符号
export function getSuitSymbol(suit: Suit): string {
  switch (suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
  }
}

// 获取花色颜色
export function getSuitColor(suit: Suit): string {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-gray-800';
}