import { Card } from './card.js'
import type { Card as CardInterface } from './types.js'
import { GAME_CONSTANTS } from './constants.js'

export class GameLine {
  private cards: Card[] = []

  constructor(initialCards: Card[] = []) {
    this.cards = [...initialCards]
  }

  public addCard(card: Card): void {
    this.cards.push(card)
  }

  public takeLastCards(count: number): Card[] {
    const actualCount = Math.min(count, this.cards.length, GAME_CONSTANTS.MAX_LINE_COLLECTION)
    return this.cards.splice(-actualCount, actualCount)
  }

  public getCards(): Card[] {
    return [...this.cards]
  }

  public getCardCount(): number {
    return this.cards.length
  }

  public isEmpty(): boolean {
    return this.cards.length === 0
  }

  public getLastCard(): Card | undefined {
    return this.cards[this.cards.length - 1]
  }

  public clear(): void {
    this.cards = []
  }

  public toObject(): CardInterface[] {
    return this.cards.map((card) => card.toObject())
  }
}
