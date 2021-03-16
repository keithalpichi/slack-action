import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'
import { Block } from '@slack/types'
import { SectionBlock, MDownText } from '../../slack'
import * as core from '@actions/core'

export type TableTemplateIDs = 'table1'

export type TableInputs = Inputs & {
  template: TableTemplateIDs
}

export class Table {
  static build(inputs: TableInputs): GithubSlackAdapter | undefined {
    switch (inputs.template) {
      case 'table1':
        return new TableOne(inputs)
      default:
        return undefined
    }
  }
}

export class TableOne extends BaseGithubSlackAdapter<TableInputs> implements GithubSlackAdapter {
  constructor(inputs: TableInputs) {
    super(inputs)
    this.validateInput()
  }

  validateInput(): void {
    if (!this.inputs.status) {
      core.setFailed(
        'Invalid "status" input provided ' +
        'template "table1". Please ensure it is a ' +
        'non-empty string.'
      )
    }
    this.inputValidated = true
  }

  labelValue(label: string, value: string): string {
    return `*${label}:*\n${value}`
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const blocks: Block[] = [
      this.header(this.inputs.title),
      this.divider(),
    ]
    if (this.inputs.description.length) {
      blocks.push(this.full_section_block(this.inputs.description))
    }
    const tableSection = new SectionBlock()
    tableSection.fields = tableSection.fields.concat([
      new MDownText(this.labelValue('Repo', this.repositoryName)),
      new MDownText(this.labelValue('Ref', this.branch)),
      new MDownText(this.labelValue('Workflow', this.workflow)),
      new MDownText(this.labelValue('Job', this.jobName)),
      new MDownText(this.labelValue('Event', this.eventName)),
      new MDownText(this.labelValue('Status', this.inputs.status)),
      new MDownText(this.labelValue('Commit Hash', this.shortSha)),
      new MDownText(this.labelValue('Run ID', this.runId)),
      new MDownText(this.labelValue('Run Number',
        this.link(this.workflowUrl, this.runNumber))),
    ])
    blocks.push(tableSection)
    const message: IncomingWebhookSendArguments = {
      blocks
    }
    return message
  }
}