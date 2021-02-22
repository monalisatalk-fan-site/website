export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return [y, `${m}`.padStart(2, '0'), `${d}`.padStart(2, '0')].join('.');
};
