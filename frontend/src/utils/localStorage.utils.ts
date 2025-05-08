/**
 * @description Sets data to local storage
 */
export const setLocalStorageData = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * @description Gets data from local storage
 */
export const getLocalStorageData = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * @description Removes data from local storage
 */
export const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key);
};
