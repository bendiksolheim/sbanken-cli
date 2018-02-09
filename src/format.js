function camelCaseToNormalCase(text) {
  return (
    text[0].toUpperCase() +
    text
      .slice(1)
      .replace(/([A-ZÆØÅ])/, ' $1')
      .toLowerCase()
  );
}

function formatDate(dateObject) {
  const date = dateObject
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${date}.${month}.${year}`;
}

function formatAmount(amount) {
  return amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
    .replace('.', ',');
}

module.exports = { formatAmount, formatDate, camelCaseToNormalCase };
