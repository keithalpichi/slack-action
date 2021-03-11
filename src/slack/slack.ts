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
      channel: inputs.channel || undefined
    }
  }

  private updateDefaults(original: IncomingWebhookSendArguments): IncomingWebhookSendArguments {
    // TODO:
    return original
  }

  async notify(message: IncomingWebhookSendArguments): Promise<IncomingWebhookResult> {
    const webhook = new IncomingWebhook(this.webhookUrl)
    message = this.updateDefaults(message)
    return await webhook.send(message)
  }
}