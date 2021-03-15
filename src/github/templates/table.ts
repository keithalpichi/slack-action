import { GithubSlackAdapter, BaseGithubSlackAdapter } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'
import { Block } from '@slack/types'

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
    this.inputValidated = true
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const blocks: Block[] = [
      this.header(this.inputs.title),
      this.divider(),
    ]
    if (this.inputs.description.length) {
      blocks.push(this.full_section_block(this.inputs.description))
    }
    const message: IncomingWebhookSendArguments = {
      blocks
    }
    return message
  }
}
/**
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Repo:*\nOctocat"
        },
        {
          "type": "mrkdwn",
          "text": "*Ref:*\nmaster"
        },
        {
          "type": "mrkdwn",
          "text": "*Workflow:*\nTests"
        },
        {
          "type": "mrkdwn",
          "text": "*Job:*\nUnit Tests"
        },
        {
          "type": "mrkdwn",
          "text": "*Event:*\nPush"
        },
        {
          "type": "mrkdwn",
          "text": "*Status:*\nSuccess"
        },
        {
          "type": "mrkdwn",
          "text": "*Number of Commits:*\n1"
        },
        {
          "type": "mrkdwn",
          "text": "*Commit Hash:*\nacbde1234"
        },
        {
          "type": "mrkdwn",
          "text": "*Run ID:*\n3"
        },
        {
          "type": "mrkdwn",
          "text": "*Run Number:*\n<https://github.com/user/repo/actions/runs/12|12>"
        }
      ]
    }
 */