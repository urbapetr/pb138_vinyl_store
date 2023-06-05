export const joinArray = (array: string[]) => {
  let output = '';
  array.forEach((e, i) => {
    if (i !== array.length - 1) {
      output += `${e}, `;
    } else {
      output += e;
    }
  });

  return output;
};
