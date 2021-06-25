import { Card, CardDeckRecord, SuitNameType } from '../models/deck-card.model';

const TOTAL_SUITS_PER_DECK = 13;

export class CardDeckCounter {
  private cardDecksCounter: CardDeckRecord[] = [];
  constructor(private cardList: Card[]) {}

  public getFullDeckTotalCount(): number {
    this.cardList.forEach((card) => {
      const { suit, value } = card;
      const index = this.getAvailableCardRecordIndex(card);
      if (index !== -1) {
        this.addSuitValue(index, suit, value);
        if (this.isCardAllOfSuitsCompleted(index)) {
          this.markCardDeckAsCompleted(index);
        }
      }
    });
    return this.getCardDeckStatusCompleted();
  }

  private getAvailableCardRecordIndex(card: Card): number {
    if (!this.cardDecksCounter.length) {
      return this.createCardDeckRecordItem(0).index;
    } else {
      let availableDeckIndex = -1;
      for (const { deckIndex } of this.cardDecksCounter) {
        const nextDeckIndex = deckIndex + 1;
        if (this.isAvailableCurrentCardDeckRecord(deckIndex, card)) {
          availableDeckIndex = deckIndex;
          break;
        } else if (
          this.cardDecksCounter[nextDeckIndex] &&
          this.isAvailableCurrentCardDeckRecord(nextDeckIndex, card)
        ) {
          availableDeckIndex++;
        } else if (nextDeckIndex === this.cardDecksCounter.length) {
          availableDeckIndex = this.createCardDeckRecordItem(nextDeckIndex)
            .index;
        }
      }
      return availableDeckIndex;
    }
  }

  private createCardDeckRecordItem(deckIndex: number): { index: number } {
    this.cardDecksCounter[deckIndex] = {
      deckIndex,
      isComplete: false,
      suits: {
        diamonds: [],
        spades: [],
        clubs: [],
        hearts: [],
      },
    };
    return { index: deckIndex };
  }

  private isAvailableCurrentCardDeckRecord(
    deckIndex: number,
    card: Card
  ): boolean {
    const { suit, value } = card;
    return (
      !this.isCardDeckCompleted(deckIndex) &&
      !this.isCardSuitCompleted(deckIndex, suit) &&
      !this.isValueInSuit(deckIndex, suit, value)
    );
  }

  private isCardDeckCompleted(deckIndex: number): boolean {
    return this.cardDecksCounter[deckIndex].isComplete;
  }

  private isCardSuitCompleted(
    deckIndex: number,
    suitName: SuitNameType
  ): boolean {
    return (
      this.cardDecksCounter[deckIndex].suits[suitName].length ===
      TOTAL_SUITS_PER_DECK
    );
  }

  private isValueInSuit(
    deckIndex: number,
    suitName: SuitNameType,
    value: string | number
  ): boolean {
    return this.cardDecksCounter[deckIndex].suits[suitName].includes(value);
  }

  private addSuitValue(
    deckIndex: number,
    suitName: SuitNameType,
    value: string | number
  ): void {
    const currentSuit = this.cardDecksCounter[deckIndex].suits[suitName];
    currentSuit.push(value);
    currentSuit.sort();
  }

  private isCardAllOfSuitsCompleted(deckIndex: number): boolean {
    return Object.entries(this.cardDecksCounter[deckIndex].suits).every(
      ([suit, values]) => {
        return values.length === TOTAL_SUITS_PER_DECK;
      }
    );
  }

  private markCardDeckAsCompleted(deckIndex: number): void {
    this.cardDecksCounter[deckIndex].isComplete = true;
  }

  private getCardDeckStatusCompleted(): number {
    return this.cardDecksCounter.filter((cardDeck) => {
      return cardDeck.isComplete;
    }).length;
  }
}
