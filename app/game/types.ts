import { z } from 'zod'

export const CardTypeSchema = z.enum(['SOUTIEN', 'ALLIANCE', 'TRAHISON', 'VILLE'])
export type CardType = z.infer<typeof CardTypeSchema>

export const CardValueSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
])
export type CardValue = z.infer<typeof CardValueSchema>

export const CardSchema = z.object({
  id: z.string().uuid(),
  type: CardTypeSchema,
  value: CardValueSchema,
})
export type Card = z.infer<typeof CardSchema>

export const PlayerSchema = z.object({
  id: z.string().uuid(),
  hand: z.array(CardSchema),
  collectedCards: z.array(CardSchema),
  hasCollectedThisRound: z.boolean(),
})
export type Player = z.infer<typeof PlayerSchema>

export const GameStateSchema = z.object({
  players: z.tuple([PlayerSchema, PlayerSchema]),
  line: z.array(CardSchema),
  currentRound: z.number().min(1).max(4),
  currentPlayer: z.number().min(0).max(1),
  actionCount: z.array(z.number().min(0).max(6)).length(2),
  gamePhase: z.enum(['SETUP', 'PLAYING', 'ROUND_END', 'GAME_END']),
  winner: z.string().uuid().optional(),
})
export type GameState = z.infer<typeof GameStateSchema>

export const ActionTypeSchema = z.enum(['PLAY_CARD', 'TAKE_CARDS'])
export type ActionType = z.infer<typeof ActionTypeSchema>

export const GameActionSchema = z.object({
  type: ActionTypeSchema,
  playerId: z.string().uuid(),
  cardId: z.string().uuid().optional(),
})
export type GameAction = z.infer<typeof GameActionSchema>

export const VictoryConditionSchema = z.enum(['CITY_CARDS', 'POINTS'])
export type VictoryCondition = z.infer<typeof VictoryConditionSchema>

export const ScoreBreakdownSchema = z.object({
  soutienMajorities: z.record(z.string(), z.number()),
  soutienBonus: z.number(),
  alliancePoints: z.number(),
  trahisonPoints: z.number(),
  total: z.number(),
})
export type ScoreBreakdown = z.infer<typeof ScoreBreakdownSchema>
