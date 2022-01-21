export function validateIsEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const isEmptyObj = obj => {
  return Object.keys(obj).length === 0;
};
