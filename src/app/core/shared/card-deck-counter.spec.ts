import { CardDeckCounter } from './card-deck-counter';
import { cards } from '../mocks/mockMixedDecks';

describe('CardDeckCounter', () => {
  let fullCardDeckCounter: CardDeckCounter;
  beforeEach(() => {
    fullCardDeckCounter = new CardDeckCounter(cards);
  });
  it('should get full total deck count', () => {
    expect(fullCardDeckCounter.getFullDeckTotalCount()).toBe(2);
  });
});
