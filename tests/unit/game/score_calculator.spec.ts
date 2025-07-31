import { test } from '@japa/runner'
import { ScoreCalculator } from '../../../app/game/score_calculator.js'
import { Player } from '../../../app/game/player.js'
import { Card } from '../../../app/game/card.js'
import { GAME_CONSTANTS } from '../../../app/game/constants.js'

test.group('ScoreCalculator - SOUTIEN Majorities', () => {
  test('should calculate SOUTIEN majority for single player', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 5), new Card('SOUTIEN', 5)]

    const cards2 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 5)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienMajorities[5], 5)
    assert.equal(scores[1].soutienMajorities[5], 0)
  })

  test('should not award points for tied SOUTIEN counts', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 6), new Card('SOUTIEN', 6)]

    const cards2 = [new Card('SOUTIEN', 6), new Card('SOUTIEN', 6)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienMajorities[6], 0)
    assert.equal(scores[1].soutienMajorities[6], 0)
  })

  test('should calculate all SOUTIEN values independently', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
    ]

    const cards2 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienMajorities[5], 5)
    assert.equal(scores[0].soutienMajorities[6], 0)
    assert.equal(scores[0].soutienMajorities[7], 7)
    assert.equal(scores[0].soutienMajorities[8], 0)

    assert.equal(scores[1].soutienMajorities[5], 0)
    assert.equal(scores[1].soutienMajorities[6], 6)
    assert.equal(scores[1].soutienMajorities[7], 0)
    assert.equal(scores[1].soutienMajorities[8], 8)
  })
})

test.group('ScoreCalculator - SOUTIEN Complete Set Bonus', () => {
  test('should award bonus for complete SOUTIEN set', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
    ]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienBonus, GAME_CONSTANTS.SCORING.SOUTIEN_COMPLETE_SET_BONUS)
    assert.equal(scores[1].soutienBonus, 0)
  })

  test('should not award bonus for incomplete SOUTIEN set', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 6), new Card('SOUTIEN', 7)]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienBonus, 0)
    assert.equal(scores[1].soutienBonus, 0)
  })

  test('should award bonus even with multiple cards of same value', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
      new Card('SOUTIEN', 8),
      new Card('SOUTIEN', 8),
    ]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienBonus, GAME_CONSTANTS.SCORING.SOUTIEN_COMPLETE_SET_BONUS)
  })

  test('should award bonus to both players if both have complete sets', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
    ]

    const cards2 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].soutienBonus, GAME_CONSTANTS.SCORING.SOUTIEN_COMPLETE_SET_BONUS)
    assert.equal(scores[1].soutienBonus, GAME_CONSTANTS.SCORING.SOUTIEN_COMPLETE_SET_BONUS)
  })
})

test.group('ScoreCalculator - ALLIANCE and TRAHISON Points', () => {
  test('should calculate ALLIANCE points correctly', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('ALLIANCE', 2), new Card('ALLIANCE', 3), new Card('ALLIANCE', 4)]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].alliancePoints, 2 + 3 + 4)
    assert.equal(scores[1].alliancePoints, 0)
  })

  test('should calculate TRAHISON points correctly', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('TRAHISON', 1), new Card('TRAHISON', 2), new Card('TRAHISON', 3)]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].trahisonPoints, 1 + 2 + 3)
    assert.equal(scores[1].trahisonPoints, 0)
  })

  test('should not count VILLE cards in scoring', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('VILLE', 0),
      new Card('VILLE', 0),
      new Card('VILLE', 0),
      new Card('ALLIANCE', 4),
    ]

    player1.collectCards(cards1)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    assert.equal(scores[0].alliancePoints, 4)
    assert.equal(scores[0].trahisonPoints, 0)
    assert.equal(scores[0].total, 4)
  })
})

test.group('ScoreCalculator - Total Score', () => {
  test('should calculate total score correctly', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
      new Card('ALLIANCE', 3),
      new Card('TRAHISON', 2),
    ]

    const cards2 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 6), new Card('SOUTIEN', 6)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    const expectedPlayer1 = 5 + 7 + 8 + 5 + 3 + 2
    assert.equal(scores[0].total, expectedPlayer1)

    const expectedPlayer2 = 6
    assert.equal(scores[1].total, expectedPlayer2)
  })

  test('should handle complex scoring scenario', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
      new Card('ALLIANCE', 4),
      new Card('ALLIANCE', 4),
      new Card('TRAHISON', 3),
    ]

    const cards2 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 6),
      new Card('ALLIANCE', 2),
      new Card('TRAHISON', 1),
      new Card('TRAHISON', 2),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const calculator = new ScoreCalculator()
    const scores = calculator.calculateScores([player1, player2])

    const expectedPlayer1 = 7 + 8 + 5 + 4 + 4 + 3
    const expectedPlayer2 = 5 + 6 + 2 + 1 + 2

    assert.equal(scores[0].total, expectedPlayer1)
    assert.equal(scores[1].total, expectedPlayer2)
  })
})
