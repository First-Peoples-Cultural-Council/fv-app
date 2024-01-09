function isDateOlderThen(timestamp: string, days: number): boolean {
  // Convert timestamp to date.
  const timestampDate = new Date(timestamp);

  // Get the current time.
  const currentTime: Date = new Date();

  // Convert dates to timestamps in milliseconds.
  const timestampMs = timestampDate.getTime();
  const currentMs = currentTime.getTime();

  // Calculate the difference between the current time and the given
  // timestamp in milliseconds.
  const differenceInMs = currentMs - timestampMs;

  // Calculate the number of milliseconds in a day.
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  // Check if the difference is greater than the number of milliseconds in a day
  // and the number of days .
  return differenceInMs > millisecondsInDay * days;
}

export default isDateOlderThen;
