export const formHandler = <T extends object>(values: T) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random();
      if (rnd > 0.3) {
        resolve(values);
      } else {
        reject(new Error('Something goes wrong'));
      }
    }, 1000 + Math.random() * 1000);
  });
};
