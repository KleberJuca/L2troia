import CryptoJS from 'crypto-js';

export const sha1ToBase64 = async (str: string): Promise<string> => {
  const hash = CryptoJS.SHA1(str);
  return CryptoJS.enc.Base64.stringify(hash);
};
