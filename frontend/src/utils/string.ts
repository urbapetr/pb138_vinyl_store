export const joinArray = (array: { genre: { name: string } }[]) => {
  let output = '';
  array.forEach((e, i) => {
    if (i !== array.length - 1) {
      output += `${e.genre.name}, `;
    } else {
      output += e.genre.name;
    }
  });

  return output;
};
