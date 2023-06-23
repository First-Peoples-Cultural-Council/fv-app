function getRandomInt(min: number, max: number, crypto: any) {
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  const randomNumber = randomBytes[0] / (0xffffffff + 1);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

function pickRandomItems(array: any[], count: number) {
  const result = [];
  const crypto = window.crypto || (window as any)?.msCrypto; // For IE support

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInt(0, array.length - 1, crypto);
    result.push(array[randomIndex]);
  }

  return result;
}

export default pickRandomItems;
