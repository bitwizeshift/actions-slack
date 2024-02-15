const core = require('@actions/core');
const slack = require("@slack/web-api");

try {
  // Required inputs
  const token    = core.getInput('slack-token', { required: true });
  const message  = core.getMultilineInput('message', { required: true });
  const channel  = core.getInput('channel', { required: true });

  // Optional inputs
  const icon_emoji   = core.getInput('icon-emoji', { required: false });
  const icon_url     = core.getInput('icon-url', { required: false });
  const username     = core.getInput('username', { required: false });
  const markdown     = core.getBooleanInput('markdown', { required: false });
  const unfurl_media = core.getBooleanInput('unfurl-media', { required: false });
  const unfurl_links = core.getBooleanInput('unfurl-links', { required: false });
  const thread_ts    = core.getInput('thread-ts', { required: false });

  const client = new slack.WebClient(token, {
    logLevel: slack.LogLevel.WARN
  });
  const result = await client.chat.postMessage({
    text: message,
    channel: channel,
    token: token,
    icon_emoji: icon_emoji || undefined,
    icon_url: icon_url || undefined,
    username: username || undefined,
    unfurl_media: unfurl_media,
    unfurl_links: unfurl_links,
    mrkdwn: markdown,
    thread_ts: thread_ts || undefined,
  })
  if (!result.ok) {
    result.errors.forEach((err) => {
      core.error(err)
    })
    core.setFailed(`an error occurred posting to Slack channel ${channel}`);
  } else {
    core.setOutput('channel', result.channel);
    core.setOutput('ts', result.ts);
  }
} catch (error) {
  core.setFailed(error.message);
}
