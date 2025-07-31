import { test } from '@japa/runner'
import { Deck } from '../../../app/game/deck.js'
import { GAME_CONSTANTS } from '../../../app/game/constants.js'

test.group('Deck', () => {
  test('should create a deck with correct total cards', ({ assert }) => {
    const deck = new Deck()

    const totalExpected =
      GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.TOTAL +
      GAME_CONSTANTS.CARD_COUNTS.ALLIANCE.TOTAL +
      GAME_CONSTANTS.CARD_COUNTS.TRAHISON.TOTAL +
      GAME_CONSTANTS.CARD_COUNTS.VILLE.TOTAL

    assert.equal(deck.remainingCards(), totalExpected)
  })

  test('should create deck with correct SOUTIEN card distribution', ({ assert }) => {
    const deck = new Deck()
    const cards = deck.getAllCards()

    const soutienCards = cards.filter((card) => card.type === 'SOUTIEN')
    assert.equal(soutienCards.length, GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.TOTAL)

    const value5Cards = soutienCards.filter((card) => card.value === 5)
    const value6Cards = soutienCards.filter((card) => card.value === 6)
    const value7Cards = soutienCards.filter((card) => card.value === 7)
    const value8Cards = soutienCards.filter((card) => card.value === 8)

    assert.equal(value5Cards.length, GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.BY_VALUE[5])
    assert.equal(value6Cards.length, GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.BY_VALUE[6])
    assert.equal(value7Cards.length, GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.BY_VALUE[7])
    assert.equal(value8Cards.length, GAME_CONSTANTS.CARD_COUNTS.SOUTIEN.BY_VALUE[8])
  })

  test('should create deck with correct ALLIANCE card distribution', ({ assert }) => {
    const deck = new Deck()
    const cards = deck.getAllCards()

    const allianceCards = cards.filter((card) => card.type === 'ALLIANCE')
    assert.equal(allianceCards.length, GAME_CONSTANTS.CARD_COUNTS.ALLIANCE.TOTAL)

    const value2Cards = allianceCards.filter((card) => card.value === 2)
    const value3Cards = allianceCards.filter((card) => card.value === 3)
    const value4Cards = allianceCards.filter((card) => card.value === 4)

    assert.equal(value2Cards.length, GAME_CONSTANTS.CARD_COUNTS.ALLIANCE.BY_VALUE[2])
    assert.equal(value3Cards.length, GAME_CONSTANTS.CARD_COUNTS.ALLIANCE.BY_VALUE[3])
    assert.equal(value4Cards.length, GAME_CONSTANTS.CARD_COUNTS.ALLIANCE.BY_VALUE[4])
  })

  test('should create deck with correct TRAHISON card distribution', ({ assert }) => {
    const deck = new Deck()
    const cards = deck.getAllCards()

    const trahisonCards = cards.filter((card) => card.type === 'TRAHISON')
    assert.equal(trahisonCards.length, GAME_CONSTANTS.CARD_COUNTS.TRAHISON.TOTAL)

    const value1Cards = trahisonCards.filter((card) => card.value === 1)
    const value2Cards = trahisonCards.filter((card) => card.value === 2)
    const value3Cards = trahisonCards.filter((card) => card.value === 3)

    assert.equal(value1Cards.length, GAME_CONSTANTS.CARD_COUNTS.TRAHISON.BY_VALUE[1])
    assert.equal(value2Cards.length, GAME_CONSTANTS.CARD_COUNTS.TRAHISON.BY_VALUE[2])
    assert.equal(value3Cards.length, GAME_CONSTANTS.CARD_COUNTS.TRAHISON.BY_VALUE[3])
  })

  test('should create deck with correct VILLE card count', ({ assert }) => {
    const deck = new Deck()
    const cards = deck.getAllCards()

    const villeCards = cards.filter((card) => card.type === 'VILLE')
    assert.equal(villeCards.length, GAME_CONSTANTS.CARD_COUNTS.VILLE.TOTAL)

    villeCards.forEach((card) => {
      assert.equal(card.value, 0)
    })
  })

  test('should shuffle deck randomly', ({ assert }) => {
    const deck1 = new Deck()
    const deck2 = new Deck()

    deck1.shuffle()
    deck2.shuffle()

    const cards1 = deck1.getAllCards()
    const cards2 = deck2.getAllCards()

    let differentPositions = 0
    for (let i = 0; i < Math.min(cards1.length, cards2.length); i++) {
      if (cards1[i].id !== cards2[i].id) {
        differentPositions++
      }
    }

    assert.isTrue(differentPositions > 10, 'Shuffle should significantly change card order')
  })

  test('should remove specified number of cards', ({ assert }) => {
    const deck = new Deck()
    const initialCount = deck.remainingCards()

    const removedCards = deck.removeCards(GAME_CONSTANTS.CARDS_TO_REMOVE)

    assert.equal(removedCards.length, GAME_CONSTANTS.CARDS_TO_REMOVE)
    assert.equal(deck.remainingCards(), initialCount - GAME_CONSTANTS.CARDS_TO_REMOVE)
  })

  test('should deal specified number of cards', ({ assert }) => {
    const deck = new Deck()
    const initialCount = deck.remainingCards()

    const dealtCards = deck.dealCards(GAME_CONSTANTS.INITIAL_HAND_SIZE)

    assert.equal(dealtCards.length, GAME_CONSTANTS.INITIAL_HAND_SIZE)
    assert.equal(deck.remainingCards(), initialCount - GAME_CONSTANTS.INITIAL_HAND_SIZE)
  })

  test('should throw error when dealing more cards than available', ({ assert }) => {
    const deck = new Deck()
    const remainingCards = deck.remainingCards()

    assert.throws(() => deck.dealCards(remainingCards + 1), 'Not enough cards in deck')
  })

  test('should throw error when removing more cards than available', ({ assert }) => {
    const deck = new Deck()
    const remainingCards = deck.remainingCards()

    assert.throws(() => deck.removeCards(remainingCards + 1), 'Not enough cards in deck')
  })

  test('should check if deck is empty', ({ assert }) => {
    const deck = new Deck()

    assert.isFalse(deck.isEmpty())

    deck.dealCards(deck.remainingCards())

    assert.isTrue(deck.isEmpty())
    assert.equal(deck.remainingCards(), 0)
  })

  test('should create line cards for game setup', ({ assert }) => {
    const deck = new Deck()
    deck.shuffle()
    deck.removeCards(GAME_CONSTANTS.CARDS_TO_REMOVE)

    const lineCards = deck.dealCards(GAME_CONSTANTS.INITIAL_LINE_SIZE)

    assert.equal(lineCards.length, GAME_CONSTANTS.INITIAL_LINE_SIZE)
  })
})
