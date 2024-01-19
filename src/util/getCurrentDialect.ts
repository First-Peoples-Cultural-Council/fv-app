export const getCurrentDialect = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) {
    return 'smalgyax';
  }
  return hostname.slice(
    0,
    hostname.indexOf(`.${process.env.REACT_APP_BASE_HOST}`)
  );
};
