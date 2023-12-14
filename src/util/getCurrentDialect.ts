export const getCurrentDialect = () => {
  const hostname = window.location.hostname;
  return hostname.slice(
    0,
    hostname.indexOf(`.${process.env.REACT_APP_BASE_HOST}`)
  );
};
