#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const upload_1 = require("./upload");
const path_1 = __importDefault(require("path"));
const program = new commander_1.Command();
program
    .name('play-upload')
    .description('CLI to upload .aab builds to Google Play Store')
    .version('1.0.0');
program
    .requiredOption('-k, --key <path>', 'Path to service account JSON key file')
    .requiredOption('-p, --package <name>', 'Android package name (e.g. com.example.app)')
    .option('-t, --track <track>', 'Track to release to (internal, alpha, beta, production)', 'internal')
    .requiredOption('-f, --file <path>', 'Path to the .aab file')
    .action(async (options) => {
    try {
        const absoluteKeyPath = path_1.default.resolve(process.cwd(), options.key);
        const absoluteFilePath = path_1.default.resolve(process.cwd(), options.file);
        await (0, upload_1.uploadBuild)({
            keyFile: absoluteKeyPath,
            packageName: options.package,
            track: options.track,
            filePath: absoluteFilePath,
        });
    }
    catch (error) {
        console.error('Error:', error.message || error);
        process.exit(1);
    }
});
program.parse(process.argv);
