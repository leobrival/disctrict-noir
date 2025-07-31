import { GAME_CONSTANTS } from './constants.js'
import { Player } from './player.js'
import { ScoreCalculator } from './score_calculator.js'
import type { ScoreBreakdown, VictoryCondition } from './types.js'

interface VictoryResult {
  hasWinner: boolean
  winnerId?: string
  condition?: VictoryCondition
  winnerScore?: number
  loserScore?: number
}

export class VictoryChecker {
  private scoreCalculator = new ScoreCalculator()

  public checkImmediateVictory(players: Player[]): VictoryResult {
    for (const player of players) {
      const villeCards = player.getCardsByType('VILLE')
      if (villeCards.length >= GAME_CONSTANTS.VICTORY_CONDITIONS.CITY_CARDS_NEEDED) {
        return {
          hasWinner: true,
          winnerId: player.id,
          condition: 'CITY_CARDS',
        }
      }
    }

    return { hasWinner: false }
  }

  public checkPointsVictory(players: Player[]): VictoryResult {
    const scores = this.scoreCalculator.calculateScores(players)
    const [player1Score, player2Score] = scores
    const [player1, player2] = players

    if (player1Score.total > player2Score.total) {
      return {
        hasWinner: true,
        winnerId: player1.id,
        condition: 'POINTS',
        winnerScore: player1Score.total,
        loserScore: player2Score.total,
      }
    } else if (player2Score.total > player1Score.total) {
      return {
        hasWinner: true,
        winnerId: player2.id,
        condition: 'POINTS',
        winnerScore: player2Score.total,
        loserScore: player1Score.total,
      }
    } else {
      const tiebreakResult = this.resolveTiebreaker(players, [player1Score, player2Score])
      return tiebreakResult
    }
  }

  private resolveTiebreaker(
    players: Player[],
    scores: [ScoreBreakdown, ScoreBreakdown]
  ): VictoryResult {
    const [player1, player2] = players
    const [player1Score, player2Score] = scores

    const soutienValues = [8, 7, 6, 5] as const

    for (const value of soutienValues) {
      const player1Majority = player1Score.soutienMajorities[value]
      const player2Majority = player2Score.soutienMajorities[value]

      if (player1Majority > player2Majority) {
        return {
          hasWinner: true,
          winnerId: player1.id,
          condition: 'POINTS',
          winnerScore: player1Score.total,
          loserScore: player2Score.total,
        }
      } else if (player2Majority > player1Majority) {
        return {
          hasWinner: true,
          winnerId: player2.id,
          condition: 'POINTS',
          winnerScore: player2Score.total,
          loserScore: player1Score.total,
        }
      }
    }

    return { hasWinner: false }
  }
}
