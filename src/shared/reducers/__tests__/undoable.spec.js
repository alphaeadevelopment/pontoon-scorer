import { createPast } from '../undoable';

describe('undoable', () => {
  describe('createPast', () => {
    it('adds present to empty past', () => {
      const past = [];
      const present = 1;
      const newPast = [1];
      expect(createPast(past, present)).toEqual(newPast);
    });

    it('adds present to end of existing past', () => {
      const past = [1];
      const present = 2;
      const newPast = [1, 2];
      expect(createPast(past, present)).toEqual(newPast);
    });

    it('handles absent present', () => {
      const past = [];
      const newPast = [];
      expect(createPast(past)).toEqual(newPast);
    });

    it('handles absent past and present', () => {
      const newPast = [];
      expect(createPast()).toEqual(newPast);
    });

    it('truncates past ', () => {
      const past = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const present = 11;
      const newPast = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      expect(createPast(past, present)).toEqual(newPast);
    });
  });
});
