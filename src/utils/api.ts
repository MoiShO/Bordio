export const request = (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
};