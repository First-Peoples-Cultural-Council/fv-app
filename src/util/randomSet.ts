function generateUniqueRandomItems(items: any[], count: number): any[] {
  if (count > items.length - 1) {
    count = items.length;
  }

  const randomItems: any[] = [];

  while (randomItems.length < count) {
    const randomIndex = Math.floor(Math.random() * (items.length - 1));
    const randomItem = items[randomIndex];
    if (!randomItems.includes(randomItem)) {
      randomItems.push(randomItem);
    }
  }

  return randomItems;
}

export default generateUniqueRandomItems;
