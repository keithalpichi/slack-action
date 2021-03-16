import * as core from '@actions/core'
import { Slack } from './slack'
import { Github, Inputs } from './github'

export async function run(): Promise<void> {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL || ''
    if (!webhookUrl) {
      core.warning(
        'Missing "SLACK_WEBHOOK_URL" secret. Please ensure one exists ' +
        'in order for this Github Action to work.')
      return
    }
    const inputs = new Inputs()
    const slack = new Slack(webhookUrl, inputs)
    const github = Github.build(inputs)
    const message = github.createSlackMessage()
    await slack.notify(message)
  } catch (error) {
    core.setFailed(error.message)
    core.error(error.stack)
  }
}