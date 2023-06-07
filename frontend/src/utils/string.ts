export const joinArray = (array: { name: string }[]) => {
  let output = '';
  array.forEach((e, i) => {
    if (i !== array.length - 1) {
      output += `${e.name}, `;
    } else {
      output += e.name;
    }
  });

  return output;
};
