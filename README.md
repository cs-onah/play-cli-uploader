# Google Play Store CLI Uploader

A simple command-line tool to upload Android App Bundles (`.aab`) to the Google Play Store.

## Features

- Authenticates using a Google Service Account JSON key.
- Uploads `.aab` files to a specific package.
- Supports releasing to different tracks (internal, alpha, beta, production).
- automatically commits the edit.

## Prerequisites

- Node.js installed (v14 or later recommended).
- A Google Play Developer Configuration with API access enabled.
- A Service Account with appropriate permissions and its JSON key file.

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the project:

    ```bash
    npm run build
    ```

4.  Link the package globally:
    ```bash
    npm link
    ```
    Now you can use the command `play-upload` from any directory.

## Usage

### Global Usage (Recommended)

```bash
play-upload --key <path-to-key.json> --package <package-name> --file <path-to.aab> --track <track>
```

### Local Usage

You can run the tool using `npm start` or by linking it.

```bash
# General usage
npm start -- --key <path-to-key.json> --package <package-name> --file <path-to.aab> --track <track>
```

### Options

- `-k, --key <path>`: **Required**. Path to your service account JSON key file.
- `-p, --package <name>`: **Required**. The Android package name (e.g., `com.example.myapp`).
- `-f, --file <path>`: **Required**. Path to the `.aab` file to upload.
- `-t, --track <track>`: Optional. The track to release to. Defaults to `internal`. Choices: `internal`, `alpha`, `beta`, `production`.

### Example

```bash
npm start -- \
  --key ./secrets/service-account.json \
  --package com.mycompany.awesomeapp \
  --file ./builds/app-release.aab \
  --track alpha
```

## Development

- Run in development mode (using `ts-node`):
  ```bash
  npm run dev -- --help
  ```

## Notes

- Ensure your service account has "Release Manager" permissions in the Google Play Console for the target app.
- The tool automatically creates a new edit, uploads the bundle, assigns it to the track, and commits the edit.
