import { test } from '@japa/runner'
import { GameLine } from '../../../app/game/game_line.js'
import { Card } from '../../../app/game/card.js'
import { GAME_CONSTANTS } from '../../../app/game/constants.js'

test.group('GameLine', () => {
  test('should initialize with empty line', ({ assert }) => {
    const gameLine = new GameLine()

    assert.equal(gameLine.getCards().length, 0)
    assert.isTrue(gameLine.isEmpty())
  })

  test('should initialize with initial cards', ({ assert }) => {
    const initialCards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3)]

    const gameLine = new GameLine(initialCards)

    assert.equal(gameLine.getCards().length, 2)
    assert.isFalse(gameLine.isEmpty())
    assert.equal(gameLine.getCards()[0].id, initialCards[0].id)
    assert.equal(gameLine.getCards()[1].id, initialCards[1].id)
  })

  test('should add card to end of line', ({ assert }) => {
    const gameLine = new GameLine()
    const card1 = new Card('SOUTIEN', 6)
    const card2 = new Card('TRAHISON', 2)

    gameLine.addCard(card1)
    assert.equal(gameLine.getCards().length, 1)
    assert.equal(gameLine.getCards()[0].id, card1.id)

    gameLine.addCard(card2)
    assert.equal(gameLine.getCards().length, 2)
    assert.equal(gameLine.getCards()[1].id, card2.id)
  })

  test('should take last N cards from line', ({ assert }) => {
    const gameLine = new GameLine()
    const cards = [
      new Card('SOUTIEN', 5),
      new Card('ALLIANCE', 3),
      new Card('TRAHISON', 1),
      new Card('VILLE', 0),
      new Card('SOUTIEN', 7),
    ]

    cards.forEach((card) => gameLine.addCard(card))

    const takenCards = gameLine.takeLastCards(3)

    assert.equal(takenCards.length, 3)
    assert.equal(gameLine.getCards().length, 2)

    assert.equal(takenCards[0].id, cards[2].id)
    assert.equal(takenCards[1].id, cards[3].id)
    assert.equal(takenCards[2].id, cards[4].id)

    assert.equal(gameLine.getCards()[0].id, cards[0].id)
    assert.equal(gameLine.getCards()[1].id, cards[1].id)
  })

  test('should take all cards when requesting more than available', ({ assert }) => {
    const gameLine = new GameLine()
    const cards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3)]

    cards.forEach((card) => gameLine.addCard(card))

    const takenCards = gameLine.takeLastCards(5)

    assert.equal(takenCards.length, 2)
    assert.equal(gameLine.getCards().length, 0)
    assert.isTrue(gameLine.isEmpty())
  })

  test('should return empty array when taking from empty line', ({ assert }) => {
    const gameLine = new GameLine()

    const takenCards = gameLine.takeLastCards(3)

    assert.equal(takenCards.length, 0)
    assert.isTrue(gameLine.isEmpty())
  })

  test('should respect max collection limit', ({ assert }) => {
    const gameLine = new GameLine()
    const cards = Array(10)
      .fill(null)
      .map(() => new Card('SOUTIEN', 5))

    cards.forEach((card) => gameLine.addCard(card))

    const takenCards = gameLine.takeLastCards(GAME_CONSTANTS.MAX_LINE_COLLECTION)

    assert.equal(takenCards.length, GAME_CONSTANTS.MAX_LINE_COLLECTION)
    assert.equal(gameLine.getCards().length, 10 - GAME_CONSTANTS.MAX_LINE_COLLECTION)
  })

  test('should get card count correctly', ({ assert }) => {
    const gameLine = new GameLine()

    assert.equal(gameLine.getCardCount(), 0)

    gameLine.addCard(new Card('SOUTIEN', 6))
    assert.equal(gameLine.getCardCount(), 1)

    gameLine.addCard(new Card('ALLIANCE', 4))
    assert.equal(gameLine.getCardCount(), 2)
  })

  test('should peek at last card without removing it', ({ assert }) => {
    const gameLine = new GameLine()
    const card1 = new Card('SOUTIEN', 5)
    const card2 = new Card('ALLIANCE', 3)

    gameLine.addCard(card1)
    gameLine.addCard(card2)

    const lastCard = gameLine.getLastCard()

    assert.equal(lastCard?.id, card2.id)
    assert.equal(gameLine.getCardCount(), 2)
  })

  test('should return undefined when peeking at empty line', ({ assert }) => {
    const gameLine = new GameLine()

    const lastCard = gameLine.getLastCard()

    assert.isUndefined(lastCard)
  })

  test('should clear all cards from line', ({ assert }) => {
    const gameLine = new GameLine()
    const cards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3), new Card('TRAHISON', 1)]

    cards.forEach((card) => gameLine.addCard(card))
    assert.equal(gameLine.getCardCount(), 3)

    gameLine.clear()

    assert.equal(gameLine.getCardCount(), 0)
    assert.isTrue(gameLine.isEmpty())
  })

  test('should convert to object correctly', ({ assert }) => {
    const gameLine = new GameLine()
    const cards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3)]

    cards.forEach((card) => gameLine.addCard(card))

    const obj = gameLine.toObject()

    assert.equal(obj.length, 2)
    assert.equal(obj[0].id, cards[0].id)
    assert.equal(obj[1].id, cards[1].id)
  })

  test('should handle game setup scenario', ({ assert }) => {
    const initialCards = [new Card('SOUTIEN', 5), new Card('ALLIANCE', 3)]

    const gameLine = new GameLine(initialCards)

    assert.equal(gameLine.getCardCount(), GAME_CONSTANTS.INITIAL_LINE_SIZE)

    gameLine.addCard(new Card('TRAHISON', 2))
    gameLine.addCard(new Card('VILLE', 0))

    const takenCards = gameLine.takeLastCards(3)

    assert.equal(takenCards.length, 3)
    assert.equal(gameLine.getCardCount(), 1)
  })
})
