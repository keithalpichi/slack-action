import {
  KnownBlock,
  Block,
} from '@slack/types'
import { GithubSlackAdapter, BaseGithubSlackAdapter, StepOutcome } from '../adapter'
import { IncomingWebhookSendArguments } from '@slack/webhook'
import { Inputs } from '../inputs'
import { HeaderBlock, DividerBlock } from '../../slack'

export type StepsTemplateIDs = 'steps1'

export type StepsInputs = Inputs & {
  template: StepsTemplateIDs
}

export class Steps {
  static build(inputs: StepsInputs): GithubSlackAdapter {
    switch (inputs.template) {
      case 'steps1':
        return new StepsOne(inputs)
      default:
        throw BaseGithubSlackAdapter.unsupportedTemplateErr(inputs.template)
    }
  }
}

export class StepsOne extends BaseGithubSlackAdapter<StepsInputs> implements GithubSlackAdapter {
  constructor(inputs: StepsInputs) {
    super(inputs)
    this.validateInput()
  }

  validateInput(): void {
    if (!Object.keys(this.inputs.steps).length) {
      throw new Error(
        'Invalid "steps" input provided. ' +
        'Please ensure it is provided in the format ' +
        '"steps: ${{ toJSON(steps) }}" and ' +
        'the "id" key exists for all steps you want ' +
        'this Github Action to report.')
    }
    this.inputValidated = true
  }

  stepEmoji(step: StepOutcome): string {
    switch (step) {
      case 'success':
        return ':white_check_mark:'
      case 'failure':
        return ':x:'
      case 'skipped':
        return ':black_right_pointing_double_triangle_with_vertical_bar:'
      case 'cancelled':
        return ':no_entry:'
      default:
        throw new Error(`Step status "${step}" is invalid.`)
    }
  }

  createSlackMessage(): IncomingWebhookSendArguments {
    const blocks: (KnownBlock | Block)[] = [
      new HeaderBlock(this.inputs.title),
      DividerBlock
    ]
    if (this.inputs.description.length) {
      blocks.push(this.full_section_block(this.inputs.description))
    }
    if (Object.keys(this.inputs.steps).length) {
      blocks.push(new HeaderBlock('Steps Report'))
    }
    for (const stepId in this.inputs.steps) {
      const step = this.inputs.steps[stepId]
      const { outcome } = step
      const outcomeText = this.title(outcome)
      const emoji = this.stepEmoji(outcome)
      const stepTitle = `*${stepId}*`
      blocks.push(
        this.full_section_block(`${emoji} ${stepTitle}: ${outcomeText}`))
    }
    const link = this.link(this.workflowUrl, this.workflowUrl)
    blocks.push(this.full_section_block(link))
    const message: IncomingWebhookSendArguments = {
      blocks
    }
    return message
  }
}