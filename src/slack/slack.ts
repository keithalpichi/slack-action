import {
  IncomingWebhook, IncomingWebhookResult,
  IncomingWebhookDefaultArguments, IncomingWebhookSendArguments
} from '@slack/webhook'
import { Inputs } from '../github'

export class Slack {
  webhookOptions: IncomingWebhookDefaultArguments
  webhookUrl: string

  constructor(webhookUrl: string, inputs: Inputs) {
    this.webhookUrl = webhookUrl
    this.webhookOptions = {
      username: inputs.username || undefined,
      icon_emoji: inputs.icon_emoji || undefined,
      icon_url: inputs.icon_url || undefined,
      channel: inputs.channel || undefined,
      text: inputs.text || undefined,
      link_names: inputs.link_names || undefined
    }
  }

  private updateDefaults(original: IncomingWebhookSendArguments): IncomingWebhookSendArguments {
    return {
      ...this.webhookOptions,
      ...original
    }
  }

  async notify(message: IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    const webhook = new IncomingWebhook(this.webhookUrl)
    message = this.updateDefaults(message)
    return await webhook.send(message)
  }
}