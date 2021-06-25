export interface Card {
  suit: SuitNameType;
  value: string | number;
}

export interface CardDeckRecord {
  deckIndex: number;
  isComplete: boolean;
  suits: SuitType;
}

export type SuitNameType = 'diamonds' | 'spades' | 'clubs' | 'hearts';
export type SuitType = {
  [key in SuitNameType]: (string | number)[];
};
