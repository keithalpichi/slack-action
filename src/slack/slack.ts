import {
  IncomingWebhook, IncomingWebhookResult,
  IncomingWebhookDefaultArguments, IncomingWebhookSendArguments
} from '@slack/webhook'

type SlackOptions = {
  webhookUrl: string
  webhookOptions?: IncomingWebhookDefaultArguments
  channel?: string
}

export class Slack {
  webhookOptions: IncomingWebhookDefaultArguments
  webhookUrl: string
  channel?: string

  constructor(args: SlackOptions) {
    this.webhookUrl = args.webhookUrl
    this.webhookOptions = args.webhookOptions || {}
    this.channel = args.channel
  }

  async notify(message: IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    const webhook = new IncomingWebhook(this.webhookUrl)
    return await webhook.send(message)
  }
}