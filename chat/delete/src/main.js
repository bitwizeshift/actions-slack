const core = require('@actions/core');
const slack = require("@slack/web-api");

async function run() {
  try {
    // Required inputs
    const token   = core.getInput('slack-token', { required: true });
    const channel = core.getInput('channel', { required: true });
    const ts      = core.getInput('ts', { required: true });

    const client = new slack.WebClient(token, {
      logLevel: slack.LogLevel.WARN
    });
    const result = await client.chat.delete({
      token: token,
      channel: channel,
      ts: ts,
    })
    if (!result.ok) {
      core.error(result.error);
      core.setFailed(`Unable to delete message in channel ${channel}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run
}
