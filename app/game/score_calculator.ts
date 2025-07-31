import { Player } from './player.js'
import type { ScoreBreakdown } from './types.js'
import { GAME_CONSTANTS } from './constants.js'

export class ScoreCalculator {
  public calculateScores(players: Player[]): ScoreBreakdown[] {
    const [player1, player2] = players

    const player1Score = this.calculatePlayerScore(player1, player2)
    const player2Score = this.calculatePlayerScore(player2, player1)

    return [player1Score, player2Score]
  }

  private calculatePlayerScore(player: Player, opponent: Player): ScoreBreakdown {
    const soutienMajorities = this.calculateSoutienMajorities(player, opponent)
    const soutienBonus = this.calculateSoutienBonus(player)
    const alliancePoints = this.calculateAlliancePoints(player)
    const trahisonPoints = this.calculateTrahisonPoints(player)

    const total =
      Object.values(soutienMajorities).reduce((sum, points) => sum + points, 0) +
      soutienBonus +
      alliancePoints +
      trahisonPoints

    return {
      soutienMajorities,
      soutienBonus,
      alliancePoints,
      trahisonPoints,
      total,
    }
  }

  private calculateSoutienMajorities(player: Player, opponent: Player): Record<number, number> {
    const playerSoutien = player.getSoutienCardsByValue()
    const opponentSoutien = opponent.getSoutienCardsByValue()
    const majorities: Record<number, number> = {}

    GAME_CONSTANTS.SCORING.SOUTIEN_VALUES.forEach((value) => {
      const playerCount = playerSoutien[value] || 0
      const opponentCount = opponentSoutien[value] || 0

      if (playerCount > opponentCount) {
        majorities[value] = value
      } else {
        majorities[value] = 0
      }
    })

    return majorities
  }

  private calculateSoutienBonus(player: Player): number {
    const soutienCounts = player.getSoutienCardsByValue()
    const hasCompleteSet = GAME_CONSTANTS.SCORING.SOUTIEN_VALUES.every(
      (value) => soutienCounts[value] > 0
    )

    return hasCompleteSet ? GAME_CONSTANTS.SCORING.SOUTIEN_COMPLETE_SET_BONUS : 0
  }

  private calculateAlliancePoints(player: Player): number {
    const allianceCards = player.getCardsByType('ALLIANCE')
    return allianceCards.reduce((sum, card) => sum + card.value, 0)
  }

  private calculateTrahisonPoints(player: Player): number {
    const trahisonCards = player.getCardsByType('TRAHISON')
    return trahisonCards.reduce((sum, card) => sum + card.value, 0)
  }
}
