const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

// Configure your personal access token, repository details, and file details
const octokit = new Octokit({ auth: `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` });

const imagePath = path.join(__dirname, 'testImage.png'); 

// Read image file and convert to base64
// const content = fs.readFileSync(imagePath, 'base64');

// Function to upload the image
async function uploadImage(content, destPath, destName) {
    try {

        const repo = 'fCTO-CDN';
        const owner = 'd1b1';
        const branch = 'main'
        const message = `Added Image for ${destPath}`;
        const contentPath = `${destPath}/${destName}`;

        // Get the reference for the branch
        const ref = await octokit.rest.git.getRef({
            owner,
            repo,
            ref: `heads/${branch}`
        });

        const sha = ref.data.object.sha;

        // Create blob
        const blob = await octokit.rest.git.createBlob({
            owner,
            repo,
            content,
            encoding: 'base64'
        });

        // Get the latest commit
        const commit = await octokit.rest.git.getCommit({
            owner,
            repo,
            commit_sha: sha
        });

        // Create tree
        const tree = await octokit.rest.git.createTree({
            owner,
            repo,
            tree: [{
                path: contentPath,
                mode: '100644',
                type: 'blob',
                sha: blob.data.sha
            }],
            base_tree: commit.data.tree.sha
        });

        // Create new commit
        const newCommit = await octokit.rest.git.createCommit({
            owner,
            repo,
            message,
            tree: tree.data.sha,
            parents: [commit.data.sha]
        });

        // Update branch reference
        await octokit.rest.git.updateRef({
            owner,
            repo,
            ref: `heads/${branch}`,
            sha: newCommit.data.sha
        });

        console.log('Image uploaded successfully!');

        return;
        
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// uploadImage(imagePath, 'less-code/logos', 'testFile111.png');

exports.imageUpload = uploadImage

