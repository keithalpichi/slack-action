import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'

export class PlainOne extends BaseGithubSlackAdapter implements GithubSlackAdapter {
  createSlackMessage(): IncomingWebhookSendArguments {
    const message: IncomingWebhookSendArguments = {
      blocks: [
        this.header('Github Action'),
        this.divider(),
        this.section_block([this.inputs.template_args.message])
      ]
    }
    return message
  }
}