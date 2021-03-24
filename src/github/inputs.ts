import * as core from '@actions/core'
import { IncomingWebhookDefaultArguments } from '@slack/webhook'
import { TemplateIDs } from './templates'
import { Steps } from './adapter'

export type InputOptions = IncomingWebhookDefaultArguments & {
  template: TemplateIDs,
  status?: string,
  title?: string
  channel?: string,
  steps?: string
  description?: string
}


export class Inputs {
  template: TemplateIDs
  status: string
  title: string
  description: string
  steps: Steps
  channel: string

  username: string
  icon_emoji: string
  icon_url: string
  text: string
  link_names: boolean

  constructor() {
    this.template = core.getInput('template', { required: true }) as TemplateIDs
    this.status = core.getInput('status')
    this.steps = JSON.parse(core.getInput('steps') || '{}') as Steps
    this.channel = core.getInput('channel')
    this.title = core.getInput('title') || 'Github Action'
    this.description = core.getInput('description')
    this.username = core.getInput('username')
    this.icon_emoji = core.getInput('icon_emoji')
    this.icon_url = core.getInput('icon_url')
    this.text = core.getInput('text')
    const text: string = core.getInput('text')
    this.link_names = text?.length ? Boolean(text) : false
  }
}