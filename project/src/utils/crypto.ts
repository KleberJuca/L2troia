/**
 * Converts a string to SHA-1 Base64 format
 * Note: In a production environment, use a more secure hashing algorithm
 */
export const sha1ToBase64 = async (str: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = await crypto.subtle.digest('SHA-1', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
  };