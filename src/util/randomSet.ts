
function pickRandomItems(array: any[], count: number) {
    const randomItems = [];
    const arrayCopy = [...array]; // Create a copy of the original array
  
    while (randomItems.length < count && arrayCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      const randomItem = arrayCopy.splice(randomIndex, 1)[0];
      randomItems.push(randomItem);
    }
  
    return randomItems;
  }

export default pickRandomItems;