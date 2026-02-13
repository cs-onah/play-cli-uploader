import { google } from 'googleapis';
import fs from 'fs';

/**
 * Authenticates with Google Play Developer API using a service account JSON key file.
 * @param keyFilePath Path to the service account JSON key file.
 */
export const authenticate = (keyFilePath: string) => {
  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`Service account key file not found at: ${keyFilePath}`);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  return auth;
};
