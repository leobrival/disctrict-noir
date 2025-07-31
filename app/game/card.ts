import { randomUUID } from 'node:crypto'
import type { CardType, CardValue, Card as CardInterface } from './types.js'
import { CardSchema } from './types.js'

export class Card {
  public readonly id: string
  public readonly type: CardType
  public readonly value: CardValue

  constructor(type: CardType, value: CardValue) {
    this.validateCardValue(type, value)

    this.id = randomUUID()
    this.type = type
    this.value = value
  }

  private validateCardValue(type: CardType, value: CardValue): void {
    switch (type) {
      case 'SOUTIEN':
        if (![5, 6, 7, 8].includes(value)) {
          throw new Error(`Invalid value ${value} for card type ${type}`)
        }
        break
      case 'ALLIANCE':
        if (![2, 3, 4].includes(value)) {
          throw new Error(`Invalid value ${value} for card type ${type}`)
        }
        break
      case 'TRAHISON':
        if (![1, 2, 3].includes(value)) {
          throw new Error(`Invalid value ${value} for card type ${type}`)
        }
        break
      case 'VILLE':
        if (value !== 0) {
          throw new Error(`Invalid value ${value} for card type ${type}`)
        }
        break
      default:
        throw new Error(`Unknown card type: ${type}`)
    }
  }

  public toObject(): CardInterface {
    return {
      id: this.id,
      type: this.type,
      value: this.value,
    }
  }

  public static fromObject(data: CardInterface): Card {
    try {
      const validatedData = CardSchema.parse(data)
      const card = new Card(validatedData.type, validatedData.value)

      Object.defineProperty(card, 'id', {
        value: validatedData.id,
        writable: false,
        enumerable: true,
        configurable: false,
      })

      return card
    } catch (error) {
      throw new Error('Invalid card data')
    }
  }
}
