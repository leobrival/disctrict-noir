import { test } from '@japa/runner'
import { Card } from '../../../app/game/card.js'
import { CardSchema } from '../../../app/game/types.js'

test.group('Card', () => {
  test('should create a valid SOUTIEN card', ({ assert }) => {
    const card = new Card('SOUTIEN', 5)

    assert.equal(card.type, 'SOUTIEN')
    assert.equal(card.value, 5)
    assert.isTrue(card.id.length > 0)
    assert.isTrue(CardSchema.safeParse(card.toObject()).success)
  })

  test('should create a valid ALLIANCE card', ({ assert }) => {
    const card = new Card('ALLIANCE', 3)

    assert.equal(card.type, 'ALLIANCE')
    assert.equal(card.value, 3)
    assert.isTrue(CardSchema.safeParse(card.toObject()).success)
  })

  test('should create a valid TRAHISON card', ({ assert }) => {
    const card = new Card('TRAHISON', 2)

    assert.equal(card.type, 'TRAHISON')
    assert.equal(card.value, 2)
    assert.isTrue(CardSchema.safeParse(card.toObject()).success)
  })

  test('should create a valid VILLE card', ({ assert }) => {
    const card = new Card('VILLE', 0)

    assert.equal(card.type, 'VILLE')
    assert.equal(card.value, 0)
    assert.isTrue(CardSchema.safeParse(card.toObject()).success)
  })

  test('should throw error for invalid SOUTIEN card value', ({ assert }) => {
    assert.throws(() => new Card('SOUTIEN', 3 as any), 'Invalid value 3 for card type SOUTIEN')
    assert.throws(() => new Card('SOUTIEN', 9 as any), 'Invalid value 9 for card type SOUTIEN')
  })

  test('should throw error for invalid ALLIANCE card value', ({ assert }) => {
    assert.throws(() => new Card('ALLIANCE', 1), 'Invalid value 1 for card type ALLIANCE')
    assert.throws(() => new Card('ALLIANCE', 5), 'Invalid value 5 for card type ALLIANCE')
  })

  test('should throw error for invalid TRAHISON card value', ({ assert }) => {
    assert.throws(() => new Card('TRAHISON', 0), 'Invalid value 0 for card type TRAHISON')
    assert.throws(() => new Card('TRAHISON', 4), 'Invalid value 4 for card type TRAHISON')
  })

  test('should throw error for invalid VILLE card value', ({ assert }) => {
    assert.throws(() => new Card('VILLE', 1), 'Invalid value 1 for card type VILLE')
  })

  test('should generate unique IDs for different cards', ({ assert }) => {
    const card1 = new Card('SOUTIEN', 5)
    const card2 = new Card('SOUTIEN', 5)

    assert.notEqual(card1.id, card2.id)
  })

  test('should convert to object correctly', ({ assert }) => {
    const card = new Card('ALLIANCE', 4)
    const obj = card.toObject()

    assert.equal(obj.id, card.id)
    assert.equal(obj.type, 'ALLIANCE')
    assert.equal(obj.value, 4)
  })

  test('should create card from object', ({ assert }) => {
    const cardData = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      type: 'TRAHISON' as const,
      value: 1 as const,
    }

    const card = Card.fromObject(cardData)

    assert.equal(card.id, cardData.id)
    assert.equal(card.type, cardData.type)
    assert.equal(card.value, cardData.value)
  })

  test('should validate card data when creating from object', ({ assert }) => {
    const invalidCardData = {
      id: 'invalid-id',
      type: 'INVALID' as any,
      value: 99 as any,
    }

    assert.throws(() => Card.fromObject(invalidCardData), 'Invalid card data')
  })
})
