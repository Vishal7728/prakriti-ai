const QUOTES = [
  { text: 'प्रकृति की गोद में ही शांति है, और ज्ञान उसी से जन्म लेता है।', author: null },
  { text: 'ज्ञान वह धन है जो बाँटने से बढ़ता है।', author: null },
]
export function getDailyQuote() { return QUOTES[new Date().getDate() % QUOTES.length] }