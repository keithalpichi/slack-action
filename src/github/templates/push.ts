import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'

export class Push {
  static build(inputs: Inputs): GithubSlackAdapter | undefined {
    switch (inputs.template) {
      case '1':
        return new PushOne(inputs)
      default:
        return undefined
    }
  }
}

export class PushOne extends BaseGithubSlackAdapter implements GithubSlackAdapter {
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
        // repo/branch/runId status elapsed_time (M:S) <github action URL link>
        this.eventSummary(this.workflowUrl)
      ]
    }

    const stepsSection = this.stepsSection()
    if (stepsSection) {
      message.blocks?.push(stepsSection)
    }

    return message
  }
}