export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}