export const getWeightedRandom = () => {
  const probabilities = [40, 15, 15, 13, 10, 8];
  const random = Math.random() * 100;

  let sum = 0;
  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i];
    if (random <= sum) return i + 1;
  }
  return 6;
};
