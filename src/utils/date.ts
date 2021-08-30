export function comparePriorDate(date: string, daysPrior: number): boolean {
  const today = new Date();
  const givenDate = new Date(date);
  const comparisonDate = new Date();
  comparisonDate.setDate(today.getDate() - daysPrior);
  // Is the date given NEWER than the comparison date?
  return givenDate > comparisonDate;
}

export function getDateRangeString(daysPrior: number): string {
  const today = new Date();
  const comparisonDate = new Date();
  comparisonDate.setDate(today.getDate() - daysPrior);
  return `${comparisonDate.toLocaleDateString()} -> ${today.toLocaleDateString()}`;
}
