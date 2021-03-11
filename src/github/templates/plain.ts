import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'

export class Plain {
  static build(inputs: Inputs): GithubSlackAdapter | undefined {
    switch (inputs.template) {
      case 'plain1':
        return new PlainOne(inputs)
      case 'plain2':
        return new PlainTwo(inputs)
      default:
        return undefined
    }
  }
}

export class PlainOne extends BaseGithubSlackAdapter implements GithubSlackAdapter {
  createSlackMessage(): IncomingWebhookSendArguments {
    const message: IncomingWebhookSendArguments = {
      blocks: [
        this.header(),
        this.divider(),
        this.section_block([this.inputs.template_args.message])
      ]
    }
    return message
  }
}

export class PlainTwo extends BaseGithubSlackAdapter implements GithubSlackAdapter {
  createSlackMessage(): IncomingWebhookSendArguments {
    let title = this.inputs.status
    switch (this.inputs.status) {
      case 'success':
      case 'failure':
      case 'skipped':
      case 'cancelled':
        title = this.title(this.inputs.status)
        break
      default:
        break
    }
    const message: IncomingWebhookSendArguments = {
      blocks: [
        this.header(title),
        this.divider(),
        this.eventSummary(this.workflowUrl)
      ]
    }
    return message
  }
}