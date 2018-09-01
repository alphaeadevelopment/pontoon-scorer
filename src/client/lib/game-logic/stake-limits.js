
export const getMinimumStake = (initialStake) => {
  if (initialStake) {
    return initialStake;
  }
  return 1;
};
export const getMaximumStake = (initialStake, lastBid) => {
  if (initialStake) {
    if (lastBid) {
      return lastBid;
    }
    return initialStake * 2;
  }
  return 5;
};
