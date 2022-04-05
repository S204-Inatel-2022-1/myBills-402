export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) ?? [
    0, 0, 0,
  ];
  return `rgba(${r},${g},${b},${alpha})`;
};
