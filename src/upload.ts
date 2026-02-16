import { google } from 'googleapis';
import fs from 'fs';
import { authenticate } from './auth';

interface UploadOptions {
  keyFile: string;
  packageName: string;
  track: string;
  filePath: string;
}

/**
 * Uploads an AAB file to the Google Play Store.
 */
export const uploadBuild = async (options: UploadOptions) => {
  const { keyFile, packageName, track, filePath } = options;

  console.log('Authenticating...');
  const auth = authenticate(keyFile);
  
  const androidPublisher = google.androidpublisher({
    version: 'v3',
    auth: auth,
  });

  // 1. Create a new edit
  console.log(`Creating a new edit for package: ${packageName}`);
  const editResult = await androidPublisher.edits.insert({
    packageName: packageName,
  });

  const editId = editResult.data.id;
  if (!editId) {
    throw new Error('Failed to create a new edit transaction.');
  }
  console.log(`Edit created with ID: ${editId}`);

  try {
    // 2. Upload the AAB
    console.log(`Uploading AAB file: ${filePath}`);
    const bundleRes = await androidPublisher.edits.bundles.upload({
      editId,
      packageName,
      media: {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath),
      },
    });

    const versionCode = bundleRes.data.versionCode;
    if (!versionCode) {
      throw new Error('Failed to upload bundle.');
    }
    console.log(`Bundle uploaded. Version code: ${versionCode}`);

    // 3. Assign to track
    console.log(`Assigning bundle to track: ${track}`);
    await androidPublisher.edits.tracks.update({
      editId,
      packageName,
      track,
      requestBody: {
        releases: [
          {
            versionCodes: [versionCode.toString()],
            status: 'draft', // ['completed' | 'draft']
          },
        ],
      },
    });

    // 4. Commit the edit
    console.log('Committing changes...');
    await androidPublisher.edits.commit({
      editId,
      packageName,
    });

    console.log('Successfully uploaded and released to track!');
  } catch (error) {
    console.error('An error occurred during the upload process. Attempting to discard edit...');
    try {
        await androidPublisher.edits.delete({
            editId,
            packageName
        });
        console.log('Edit discarded.');
    } catch (e) {
        console.error('Failed to discard edit.', e);
    }
    throw error;
  }
};
