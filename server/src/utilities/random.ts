export const randomId = () => {
    const numbers = Array(6).fill(0).map(() => Math.floor(Math.random() * 10));
    return numbers.join("");
  };