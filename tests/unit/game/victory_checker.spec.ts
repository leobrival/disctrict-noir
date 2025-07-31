import { test } from '@japa/runner'
import { VictoryChecker } from '../../../app/game/victory_checker.js'
import { Player } from '../../../app/game/player.js'
import { Card } from '../../../app/game/card.js'

test.group('VictoryChecker - City Cards Victory', () => {
  test('should detect immediate victory with 3 VILLE cards', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const villeCards = [new Card('VILLE', 0), new Card('VILLE', 0), new Card('VILLE', 0)]

    player1.collectCards(villeCards)

    const checker = new VictoryChecker()
    const result = checker.checkImmediateVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player1.id)
    assert.equal(result.condition, 'CITY_CARDS')
  })

  test('should not detect victory with 2 VILLE cards', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const villeCards = [new Card('VILLE', 0), new Card('VILLE', 0)]

    player1.collectCards(villeCards)

    const checker = new VictoryChecker()
    const result = checker.checkImmediateVictory([player1, player2])

    assert.isFalse(result.hasWinner)
    assert.isUndefined(result.winnerId)
    assert.isUndefined(result.condition)
  })

  test('should not detect victory when VILLE cards are split', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const villeCards1 = [new Card('VILLE', 0), new Card('VILLE', 0)]

    const villeCards2 = [new Card('VILLE', 0)]

    player1.collectCards(villeCards1)
    player2.collectCards(villeCards2)

    const checker = new VictoryChecker()
    const result = checker.checkImmediateVictory([player1, player2])

    assert.isFalse(result.hasWinner)
  })

  test('should detect victory for second player with 3 VILLE cards', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const villeCards = [new Card('VILLE', 0), new Card('VILLE', 0), new Card('VILLE', 0)]

    player2.collectCards(villeCards)

    const checker = new VictoryChecker()
    const result = checker.checkImmediateVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player2.id)
    assert.equal(result.condition, 'CITY_CARDS')
  })
})

test.group('VictoryChecker - Points Victory', () => {
  test('should detect victory by points', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 5), new Card('ALLIANCE', 4)]

    const cards2 = [new Card('TRAHISON', 1)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player1.id)
    assert.equal(result.condition, 'POINTS')
  })

  test('should handle tied points correctly', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 5), new Card('SOUTIEN', 5)]

    const cards2 = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 2), new Card('TRAHISON', 3)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player1.id)
    assert.equal(result.condition, 'POINTS')
  })

  test('should use SOUTIEN tiebreaker for equal total points', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 4)]

    const cards2 = [new Card('SOUTIEN', 6), new Card('TRAHISON', 3)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player2.id)
    assert.equal(result.condition, 'POINTS')
  })

  test('should use highest SOUTIEN value for tiebreaker', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('SOUTIEN', 8), new Card('SOUTIEN', 8), new Card('ALLIANCE', 2)]

    const cards2 = [
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
      new Card('ALLIANCE', 2),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player1.id)
    assert.equal(result.condition, 'POINTS')
  })

  test('should handle complex tiebreaker scenario', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 6),
      new Card('ALLIANCE', 3),
    ]

    const cards2 = [
      new Card('SOUTIEN', 8),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 6),
      new Card('TRAHISON', 3),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player2.id)
    assert.equal(result.condition, 'POINTS')
  })

  test('should handle perfect tie scenario', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('ALLIANCE', 4), new Card('TRAHISON', 1)]

    const cards2 = [new Card('ALLIANCE', 3), new Card('TRAHISON', 2)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isFalse(result.hasWinner)
  })
})

test.group('VictoryChecker - Integration', () => {
  test('should prioritize immediate victory over points', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [new Card('VILLE', 0), new Card('VILLE', 0), new Card('VILLE', 0)]

    const cards2 = [
      new Card('SOUTIEN', 8),
      new Card('SOUTIEN', 8),
      new Card('SOUTIEN', 8),
      new Card('ALLIANCE', 4),
      new Card('ALLIANCE', 4),
    ]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const immediateResult = checker.checkImmediateVictory([player1, player2])

    assert.isTrue(immediateResult.hasWinner)
    assert.equal(immediateResult.winnerId, player1.id)
    assert.equal(immediateResult.condition, 'CITY_CARDS')
  })

  test('should handle game end after 4 rounds', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    const cards1 = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('SOUTIEN', 8),
      new Card('ALLIANCE', 4),
    ]

    const cards2 = [new Card('ALLIANCE', 2), new Card('TRAHISON', 3), new Card('VILLE', 0)]

    player1.collectCards(cards1)
    player2.collectCards(cards2)

    const checker = new VictoryChecker()
    const result = checker.checkPointsVictory([player1, player2])

    assert.isTrue(result.hasWinner)
    assert.equal(result.winnerId, player1.id)

    const expectedScore = 5 + 6 + 7 + 8 + 5 + 4
    assert.equal(result.winnerScore, expectedScore)
  })
})
