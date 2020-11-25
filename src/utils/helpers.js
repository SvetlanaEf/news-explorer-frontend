export const Plural = (n, words, hasSpace = true) => {
  const number = Math.abs(parseInt(n));
  let resultWord = words[0];

  if (number % 100 > 10 && number % 100 < 20) resultWord = words[2];
  else if (number % 10 === 1) resultWord = words[0];
  else if (number % 10 >= 2 && number % 10 <= 4) resultWord = words[1];
  else resultWord = words[2];

  return hasSpace ? `${n} ${resultWord}` : n + resultWord;
};