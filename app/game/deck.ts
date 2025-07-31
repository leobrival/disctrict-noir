import { Card } from './card.js'
import { DECK_COMPOSITION } from './constants.js'

export class Deck {
  private cards: Card[]

  constructor() {
    this.cards = this.createDeck()
  }

  private createDeck(): Card[] {
    return DECK_COMPOSITION.map((cardData) => new Card(cardData.type, cardData.value))
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  public dealCards(count: number): Card[] {
    if (count > this.cards.length) {
      throw new Error('Not enough cards in deck')
    }

    return this.cards.splice(0, count)
  }

  public removeCards(count: number): Card[] {
    if (count > this.cards.length) {
      throw new Error('Not enough cards in deck')
    }

    return this.cards.splice(0, count)
  }

  public remainingCards(): number {
    return this.cards.length
  }

  public isEmpty(): boolean {
    return this.cards.length === 0
  }

  public getAllCards(): Card[] {
    return [...this.cards]
  }
}
