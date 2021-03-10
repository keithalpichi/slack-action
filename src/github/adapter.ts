import { IncomingWebhookSendArguments } from '@slack/webhook'
import { SectionBlock, HeaderBlock, DividerBlock, Markdown } from '../slack'
import { Inputs } from './inputs'

export type Status = 'success' | 'failure' | 'cancelled'
export type StepOutcome = Status | 'skipped'
type Step = {
  conclusion: string,
  outcome: StepOutcome
  // outputs: object
}
export type Steps = Record<string, Step>

export interface GithubSlackAdapter {
  // https://api.slack.com/methods/chat.postMessage
  createSlackMessage: () => IncomingWebhookSendArguments
}

export class BaseGithubSlackAdapter {
  inputs: Inputs
  jobName: string
  eventName: string
  workflow: string
  repositoryName: string
  repositoryUrl: string
  runId: string
  runNumber: string
  workflowUrl: string
  sha: string
  shortSha: string
  branch: string
  actor: string

  constructor(inputs: Inputs) {
    this.inputs = inputs
    this.jobName = process.env.GITHUB_JOB || ''
    this.eventName = process.env.GITHUB_EVENT_NAME || ''
    this.workflow = process.env.GITHUB_WORKFLOW || ''
    this.repositoryName = process.env.GITHUB_REPOSITORY || ''
    this.repositoryUrl = `${process.env.GITHUB_SERVER_URL || ''}/${this.repositoryName}`
    this.runId = process.env.GITHUB_RUN_ID || ''
    this.runNumber = process.env.GITHUB_RUN_NUMBER || ''
    this.workflowUrl = `${this.repositoryUrl}/actions/runs/${this.runId}`
    this.sha = process.env.GITHUB_SHA || ''
    this.shortSha = this.sha.slice(0, 8)
    this.branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF?.replace('refs/heads/', '') || ''
    this.actor = process.env.GITHUB_ACTOR || ''
  }

  protected title(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  protected statusVerb(status?: string, pastTense?: boolean): string {
    if (!status) {
      return ''
    }
    switch (status) {
      case 'success':
        if (pastTense) {
          return 'succeeded'
        }
        return 'succeed'
      case 'failure':
        if (pastTense) {
          return 'failed'
        }
        return 'fail'
      case 'cancelled':
      case 'skipped':
      default:
        return status
    }
  }

  protected statusAdverb(status?: string): string {
    if (!status) {
      return ''
    }
    switch (status) {
      case 'success':
        return 'successful'
      case 'failure':
        return 'failed'
      case 'cancelled':
      case 'skipped':
      default:
        return status
    }
  }

  protected section_block(text: string[]): SectionBlock {
    return new SectionBlock(text)
  }

  protected summary(summary: string): string {
    return Markdown.link(this.workflowUrl, summary)
  }

  protected eventSummary(summary: string): SectionBlock {
    return new SectionBlock([this.summary(summary)])
  }

  protected stepsSection(): SectionBlock | undefined {
    if (!Object.keys(this.inputs.steps)) {
      return undefined
    }
    return new SectionBlock([this.stepsSummary(this.inputs.steps)])
  }

  protected stepsSummary(steps: Steps): string {
    const summary: string[] = []
    for (const [name, step] of Object.entries(steps)) {
      summary.push(this.stepSummary(name, step))
    }
    return summary.join('\n')
  }

  protected stepSummary(name: string, step: Step): string {
    return `${Markdown.stepIcon(step.outcome)}: ${name}`
  }

  protected divider(): typeof DividerBlock {
    return DividerBlock
  }

  protected header(text = 'Github Action'): HeaderBlock {
    return new HeaderBlock(text)
  }

}