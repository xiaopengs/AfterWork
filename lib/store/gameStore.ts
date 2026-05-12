// 21点游戏状态管理 - Zustand Store
import { create } from 'zustand';
import { 
  GameState, 
  Card,
  initializeGame, 
  hit, 
  stand, 
  double 
} from '@/lib/game/blackjack';

interface GameStore extends GameState {
  // 游戏操作
  startGame: (bet?: number) => void;
  playerHit: () => void;
  playerStand: () => void;
  playerDouble: () => void;
  resetGame: () => void;
  
  // 分数记录
  chips: number;
  addChips: (amount: number) => void;
  removeChips: (amount: number) => void;
  
  // 历史记录
  history: { result: string; bet: number; timestamp: number }[];
}

export const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  deck: [],
  playerHand: [],
  dealerHand: [],
  phase: 'betting',
  playerScore: 0,
  dealerScore: 0,
  bet: 10,
  drinks: 0,
  result: null,
  message: '',
  chips: 1000,
  history: [],

  // 开始游戏
  startGame: (bet = 10) => {
    const currentChips = get().chips;
    if (currentChips < bet) {
      set({ message: '筹码不足!' });
      return;
    }
    
    const gameState = initializeGame(bet);
    set({
      ...gameState,
      phase: 'playing',
      chips: currentChips - bet,
    });
  },

  // 玩家要牌
  playerHit: () => {
    const state = get();
    if (state.phase !== 'playing') return;
    
    const newState = hit(state);
    set(newState);
    
    // 如果游戏结束，处理结果
    if (newState.phase === 'result') {
      handleGameEnd(newState);
    }
  },

  // 玩家停牌
  playerStand: () => {
    const state = get();
    if (state.phase !== 'playing') return;
    
    const newState = stand(state);
    set(newState);
    handleGameEnd(newState);
  },

  // 双倍下注
  playerDouble: () => {
    const state = get();
    if (state.phase !== 'playing') return;
    if (state.playerHand.length !== 2) return;
    
    const currentChips = get().chips;
    if (currentChips < state.bet) {
      set({ message: '筹码不足!' });
      return;
    }
    
    const newState = double(state);
    set({
      ...newState,
      chips: currentChips - state.bet, // 额外的赌注
    });
    handleGameEnd(newState);
  },

  // 重置游戏
  resetGame: () => {
    set({
      deck: [],
      playerHand: [],
      dealerHand: [],
      phase: 'betting',
      playerScore: 0,
      dealerScore: 0,
      bet: 10,
      drinks: 0,
      result: null,
      message: '',
    });
  },

  // 添加筹码
  addChips: (amount: number) => {
    set(state => ({ chips: state.chips + amount }));
  },

  // 移除筹码
  removeChips: (amount: number) => {
    set(state => ({ chips: Math.max(0, state.chips - amount) }));
  },
}));

// 处理游戏结束
function handleGameEnd(state: GameState) {
  const store = useGameStore.getState();
  const history = store.history;
  
  let chipChange = 0;
  if (state.result === 'player_win') {
    chipChange = state.bet * 2; // 赢回赌注+赔付
  } else if (state.result === 'blackjack') {
    chipChange = Math.floor(state.bet * 2.5); // Blackjack 1.5倍赔付
  }
  // 平局和输不需要额外处理（赌注已扣除）

  // 添加到历史记录
  const newHistory = [
    { 
      result: state.result || 'unknown', 
      bet: state.bet,
      timestamp: Date.now() 
    },
    ...history.slice(0, 19) // 只保留最近20条
  ];

  useGameStore.setState({
    chips: store.chips + chipChange,
    history: newHistory,
  });
}