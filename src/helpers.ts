const getRandomIndex = (array: string[]) => {
  return Math.floor(Math.random() * array.length);
}

export const createHexCode = () => {
  const hexOptions = 'ABCDEF0123456789'.split('');
  let hexChars: string[] = [];
  for (let i = 0; i < 6; i++) {
    const singleChar = hexOptions[getRandomIndex(hexOptions)]
    hexChars.push(singleChar);
  }
  return hexChars.join('');
}