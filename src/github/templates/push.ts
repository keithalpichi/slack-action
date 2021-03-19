import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'
import { LayoutTable } from '../../slack'

export type PushTemplateIDs = 'push1'

export type PushInputs = Inputs & {
  template: PushTemplateIDs
}

export class Push {
  static build(inputs: PushInputs): GithubSlackAdapter {
    switch (inputs.template) {
      case 'push1':
        return new PushOne(inputs)
      default:
        throw BaseGithubSlackAdapter.unsupportedTemplateErr(inputs.template)
    }
  }
}

export class PushOne extends BaseGithubSlackAdapter<PushInputs> implements GithubSlackAdapter {
  constructor(inputs: PushInputs) {
    super(inputs)
    this.validateInput()
  }

  validateInput(): void {
    if (this.eventName !== 'push') {
      throw this.unsupportedEventErr(this.eventName)
    }
    if (!this.inputs.status) {
      throw new Error(
        'Invalid "status" input provided ' +
        'template "push1". Please ensure it is a ' +
        'non-empty string.'
      )
    }
    this.inputValidated = true
  }

  labelValue(label: string, value: string): string {
    return `*${label}:*\n${value}`
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const lt = new LayoutTable(this.inputs)
    lt.concatCells([
      this.labelValue('Repo', this.repositoryName),
      this.labelValue('Ref', this.branch),
      this.labelValue('Workflow', this.workflow),
      this.labelValue('Job', this.jobName),
      this.labelValue('Event', this.eventName),
      this.labelValue('Status', this.inputs.status),
      this.labelValue('Commit Hash', this.shortSha),
      this.labelValue('Run ID', this.runId),
      this.labelValue('Run Number',
        this.link(this.workflowUrl, this.runNumber)),
    ])
    const message: IncomingWebhookSendArguments = {
      blocks: lt.blocks
    }
    return message
  }
}