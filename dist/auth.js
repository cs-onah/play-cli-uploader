"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
/**
 * Authenticates with Google Play Developer API using a service account JSON key file.
 * @param keyFilePath Path to the service account JSON key file.
 */
const authenticate = (keyFilePath) => {
    if (!fs_1.default.existsSync(keyFilePath)) {
        throw new Error(`Service account key file not found at: ${keyFilePath}`);
    }
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });
    return auth;
};
exports.authenticate = authenticate;
