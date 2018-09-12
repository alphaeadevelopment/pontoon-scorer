
export const getMinimumStake = (minimum, initialStake) => {
  if (initialStake) {
    return initialStake;
  }
  return minimum;
};
export const getMaximumStake = (maximum, initialStake, lastBid) => {
  if (initialStake) {
    if (lastBid) {
      return lastBid;
    }
    return initialStake * 2;
  }
  return maximum;
};
