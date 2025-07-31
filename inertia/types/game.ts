// Types frontend pour District Noir (réplication des types backend)
export type CardType = 'SOUTIEN' | 'ALLIANCE' | 'TRAHISON' | 'VILLE'
export type CardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface Card {
  id: string
  type: CardType
  value: CardValue
}

export interface Player {
  id: string
  hand: Card[]
  collectedCards: Card[]
  hasCollectedThisRound: boolean
}

export type GamePhase = 'SETUP' | 'PLAYING' | 'ROUND_END' | 'GAME_END'

export interface GameState {
  players: [Player, Player]
  line: Card[]
  currentRound: number
  currentPlayer: number
  actionCount: [number, number]
  gamePhase: GamePhase
  winner?: string
}

export type ActionType = 'PLAY_CARD' | 'TAKE_CARDS'

export interface GameAction {
  type: ActionType
  playerId: string
  cardId?: string
}

export type VictoryCondition = 'CITY_CARDS' | 'POINTS'

export interface ScoreBreakdown {
  soutienMajorities: Record<string, number>
  soutienBonus: number
  alliancePoints: number
  trahisonPoints: number
  total: number
}

export interface VictoryResult {
  hasWinner: boolean
  winnerId?: string
  condition?: VictoryCondition
  winnerScore?: number
  loserScore?: number
}

// Constantes de jeu
export const GAME_CONSTANTS = {
  MAX_ROUNDS: 4,
  INITIAL_HAND_SIZE: 5,
  MAX_LINE_COLLECTION: 5,
  ACTIONS_PER_PLAYER_PER_ROUND: 6,
  CITY_CARDS_NEEDED: 3,
  SOUTIEN_COMPLETE_SET_BONUS: 5,
} as const