export const Plural = (n, words, hasSpace = true) => {
  const number = Math.abs(parseInt(n));
  let resultWord = words[0];

  if (number % 100 > 10 && number % 100 < 20) resultWord = words[2];
  else if (number % 10 === 1) resultWord = words[0];
  else if (number % 10 >= 2 && number % 10 <= 4) resultWord = words[1];
  else resultWord = words[2];

  return hasSpace ? `${ n } ${ resultWord }` : n + resultWord;
};

export function filterUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function formatDate(d) {
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [ year, month, day ].join('-');
}