import { randomUUID } from 'node:crypto'
import { Card } from './card.js'
import type { CardType, Player as PlayerInterface } from './types.js'

export class Player {
  public readonly id: string
  public hand: Card[] = []
  public collectedCards: Card[] = []
  public hasCollectedThisRound: boolean = false

  constructor(id?: string) {
    this.id = id || randomUUID()
  }

  public addToHand(cards: Card[]): void {
    this.hand.push(...cards)
  }

  public removeFromHand(cardId: string): Card {
    const cardIndex = this.hand.findIndex((card) => card.id === cardId)
    if (cardIndex === -1) {
      throw new Error('Card not found in hand')
    }
    return this.hand.splice(cardIndex, 1)[0]
  }

  public hasCardInHand(cardId: string): boolean {
    return this.hand.some((card) => card.id === cardId)
  }

  public collectCards(cards: Card[]): void {
    this.collectedCards.push(...cards)
    this.hasCollectedThisRound = true
  }

  public resetRoundStatus(): void {
    this.hasCollectedThisRound = false
  }

  public getHandSize(): number {
    return this.hand.length
  }

  public getCardsByType(type: CardType): Card[] {
    return this.collectedCards.filter((card) => card.type === type)
  }

  public getSoutienCardsByValue(): Record<number, number> {
    const soutienCards = this.getCardsByType('SOUTIEN')
    const counts: Record<number, number> = { 5: 0, 6: 0, 7: 0, 8: 0 }

    soutienCards.forEach((card) => {
      counts[card.value] = (counts[card.value] || 0) + 1
    })

    return counts
  }

  public toObject(): PlayerInterface {
    return {
      id: this.id,
      hand: this.hand.map((card) => card.toObject()),
      collectedCards: this.collectedCards.map((card) => card.toObject()),
      hasCollectedThisRound: this.hasCollectedThisRound,
    }
  }
}
