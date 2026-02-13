#!/usr/bin/env node

import { Command } from 'commander';
import { uploadBuild } from './upload';
import path from 'path';

const program = new Command();

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
      const absoluteKeyPath = path.resolve(process.cwd(), options.key);
      const absoluteFilePath = path.resolve(process.cwd(), options.file);
      
      await uploadBuild({
        keyFile: absoluteKeyPath,
        packageName: options.package,
        track: options.track,
        filePath: absoluteFilePath,
      });
    } catch (error: any) {
      console.error('Error:', error.message || error);
      process.exit(1);
    }
  });

program.parse(process.argv);
