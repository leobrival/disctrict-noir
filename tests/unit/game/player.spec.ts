import { test } from '@japa/runner'
import { Player } from '../../../app/game/player.js'
import { Card } from '../../../app/game/card.js'

test.group('Player', () => {
  test('should create player with unique ID', ({ assert }) => {
    const player1 = new Player()
    const player2 = new Player()

    assert.isTrue(player1.id.length > 0)
    assert.isTrue(player2.id.length > 0)
    assert.notEqual(player1.id, player2.id)
  })

  test('should initialize with empty hand and collected cards', ({ assert }) => {
    const player = new Player()

    assert.equal(player.hand.length, 0)
    assert.equal(player.collectedCards.length, 0)
    assert.isFalse(player.hasCollectedThisRound)
  })

  test('should add cards to hand', ({ assert }) => {
    const player = new Player()
    const card1 = new Card('SOUTIEN', 5)
    const card2 = new Card('ALLIANCE', 3)

    player.addToHand([card1, card2])

    assert.equal(player.hand.length, 2)
    assert.equal(player.hand[0].id, card1.id)
    assert.equal(player.hand[1].id, card2.id)
  })

  test('should remove card from hand by ID', ({ assert }) => {
    const player = new Player()
    const card1 = new Card('SOUTIEN', 5)
    const card2 = new Card('ALLIANCE', 3)

    player.addToHand([card1, card2])
    const removedCard = player.removeFromHand(card1.id)

    assert.equal(player.hand.length, 1)
    assert.equal(removedCard.id, card1.id)
    assert.equal(player.hand[0].id, card2.id)
  })

  test('should throw error when removing non-existent card from hand', ({ assert }) => {
    const player = new Player()
    const card = new Card('SOUTIEN', 5)

    player.addToHand([card])

    assert.throws(() => player.removeFromHand('non-existent-id'), 'Card not found in hand')
  })

  test('should add cards to collected cards', ({ assert }) => {
    const player = new Player()
    const card1 = new Card('VILLE', 0)
    const card2 = new Card('TRAHISON', 2)

    player.collectCards([card1, card2])

    assert.equal(player.collectedCards.length, 2)
    assert.equal(player.collectedCards[0].id, card1.id)
    assert.equal(player.collectedCards[1].id, card2.id)
  })

  test('should mark player as having collected this round', ({ assert }) => {
    const player = new Player()
    const card = new Card('ALLIANCE', 4)

    assert.isFalse(player.hasCollectedThisRound)

    player.collectCards([card])

    assert.isTrue(player.hasCollectedThisRound)
  })

  test('should reset collection status for new round', ({ assert }) => {
    const player = new Player()
    const card = new Card('SOUTIEN', 6)

    player.collectCards([card])
    assert.isTrue(player.hasCollectedThisRound)

    player.resetRoundStatus()

    assert.isFalse(player.hasCollectedThisRound)
  })

  test('should count cards by type correctly', ({ assert }) => {
    const player = new Player()
    const cards = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('ALLIANCE', 3),
      new Card('TRAHISON', 1),
      new Card('VILLE', 0),
      new Card('VILLE', 0),
    ]

    player.collectCards(cards)

    assert.equal(player.getCardsByType('SOUTIEN').length, 2)
    assert.equal(player.getCardsByType('ALLIANCE').length, 1)
    assert.equal(player.getCardsByType('TRAHISON').length, 1)
    assert.equal(player.getCardsByType('VILLE').length, 2)
  })

  test('should check if player has specific card in hand', ({ assert }) => {
    const player = new Player()
    const card1 = new Card('SOUTIEN', 7)
    const card2 = new Card('ALLIANCE', 2)

    player.addToHand([card1])

    assert.isTrue(player.hasCardInHand(card1.id))
    assert.isFalse(player.hasCardInHand(card2.id))
  })

  test('should get hand size correctly', ({ assert }) => {
    const player = new Player()
    const cards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3), new Card('TRAHISON', 2)]

    assert.equal(player.getHandSize(), 0)

    player.addToHand(cards)

    assert.equal(player.getHandSize(), 3)
  })

  test('should count SOUTIEN cards by value', ({ assert }) => {
    const player = new Player()
    const cards = [
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 5),
      new Card('SOUTIEN', 6),
      new Card('SOUTIEN', 7),
      new Card('ALLIANCE', 3),
    ]

    player.collectCards(cards)

    const soutienByValue = player.getSoutienCardsByValue()

    assert.equal(soutienByValue[5], 2)
    assert.equal(soutienByValue[6], 1)
    assert.equal(soutienByValue[7], 1)
    assert.equal(soutienByValue[8], 0)
  })

  test('should convert to object correctly', ({ assert }) => {
    const player = new Player()
    const handCard = new Card('SOUTIEN', 5)
    const collectedCard = new Card('VILLE', 0)

    player.addToHand([handCard])
    player.collectCards([collectedCard])

    const obj = player.toObject()

    assert.equal(obj.id, player.id)
    assert.equal(obj.hand.length, 1)
    assert.equal(obj.collectedCards.length, 1)
    assert.isTrue(obj.hasCollectedThisRound)
    assert.equal(obj.hand[0].id, handCard.id)
    assert.equal(obj.collectedCards[0].id, collectedCard.id)
  })
})
