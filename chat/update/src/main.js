const core = require('@actions/core');
const slack = require("@slack/web-api");

async function run() {
  try {
    // Required inputs
    const token   = core.getInput('slack-token', { required: true });
    const channel = core.getInput('channel', { required: true });
    const ts      = core.getInput('ts', { required: true });

    // Conditionally required inputs
    const text        = core.getInput('text', { required: false });
    const blocks      = core.getInput('blocks', { required: false });
    const attachments = core.getInput('attachment', { required: false });

    // Optional inputs
    const parse           = core.getInput('parse', { required: false });
    const file_ids        = core.getMultilineInput('file-ids', { required: false });
    const link_names      = core.getBooleanInput('link-names', { required: false });
    const metadata        = core.getInput('metadata', { required: false });
    const reply_broadcast = core.getBooleanInput('reply-broadcast', { required: false });

    const client = new slack.WebClient(token, {
      logLevel: slack.LogLevel.WARN
    });
    const result = await client.chat.update({
      token: token,
      channel: channel,
      ts: ts,
      text: text || undefined,
      blocks: blocks || undefined,
      attachments: attachments || undefined,
      parse: parse,
      file_ids: file_ids || undefined,
      link_names: link_names,
      metadata: metadata || undefined,
      reply_broadcast: reply_broadcast
    })
    if (!result.ok) {
      if (result.error) {
        core.error(result.error);
      }
      core.setFailed(`an error occurred posting to Slack channel ${channel}`);
    } else {
      core.setOutput('channel', result.channel);
      core.setOutput('ts', result.ts);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run
}
