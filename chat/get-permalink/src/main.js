const core = require('@actions/core');
const slack = require("@slack/web-api");

async function run() {
  try {
    // Required inputs
    const token      = core.getInput('slack-token', { required: true });
    const channel    = core.getInput('channel', { required: true });
    const message_ts = core.getInput('message-ts', { required: true });

    const client = new slack.WebClient(token, {
      logLevel: slack.LogLevel.WARN
    });
    const result = await client.chat.getPermalink({
      token: token,
      channel: channel,
      message_ts: message_ts,
    })
    if (!result.ok) {
      core.error(result.error);
      core.setFailed(`Unable to get permalink in ${channel} for ${message_ts}`);
    } else {
      core.setOutput('channel', result.channel)
      core.setOutput('permalink', result.permalink)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run
}
