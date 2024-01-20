const { execSync } = require('child_process');
const axios = require('axios');

const commitSHA = execSync('git rev-parse HEAD').toString().trim();
const discordWebhook = process.env.DISCORD_WEBHOOK;
const githubToken = process.env.GITHUB_TOKEN;

async function postToDiscord(message) {
  try {
    await axios.post(discordWebhook, { content: message });
  } catch (error) {
    console.error('Error posting to Discord:', error.message);
  }
}

async function main() {
  const commitMessage = execSync(`git log --format=%B -n 1 ${commitSHA}`).toString().trim();
  const commitAuthor = execSync(`git log --format=%an -n 1 ${commitSHA}`).toString().trim();

  const message = `New commit by ${commitAuthor} (${commitSHA.slice(0, 7)}):\n${commitMessage}`;
  await postToDiscord(message);
}

main();
