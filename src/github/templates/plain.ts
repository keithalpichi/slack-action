import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'
import * as core from '@actions/core'

export type PlainTemplateIDs = 'plain1' | 'plain2'

export type PlainInputs = Inputs & {
  template: PlainTemplateIDs
}

export class Plain {
  static build(inputs: PlainInputs): GithubSlackAdapter | undefined {
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

export class PlainOne extends BaseGithubSlackAdapter<PlainInputs> implements GithubSlackAdapter {
  validateInput(): GithubSlackAdapter {
    if (!this.inputs.description || !this.inputs.description.length) {
      core.setFailed(
        'Invalid "description" input provided ' +
        'template "plain1". Please ensure it is a' +
        'non-empty string.'
      )
    }
    this.inputValidated = true
    return this
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const message: IncomingWebhookSendArguments = {
      blocks: [
        this.header(this.inputs.title),
        this.divider(),
        this.full_section_block(this.inputs.description)
      ]
    }
    return message
  }
}

export class PlainTwo extends BaseGithubSlackAdapter<PlainInputs> implements GithubSlackAdapter {
  validateInput(): GithubSlackAdapter {
    this.inputValidated = true
    return this
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const link = this.link(this.workflowUrl, this.workflowUrl)
    const message: IncomingWebhookSendArguments = {
      blocks: [
        this.header(this.inputs.title),
        this.divider(),
        this.full_section_block(link)
      ]
    }
    return message
  }
}