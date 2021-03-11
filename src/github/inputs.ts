import * as core from '@actions/core'
import { Steps, TemplateIDs } from './index'

export type InputOptions = {
  template: TemplateIDs,
  status?: string,
  title?: string
  channel?: string,
  steps?: string
  description?: string
}


export class Inputs {
  template: string
  status: string
  title: string
  description: string
  steps: Steps
  channel: string

  constructor() {
    this.template = core.getInput('template', { required: true })
    this.status = core.getInput('status')
    this.steps = JSON.parse(core.getInput('steps') || '{}') as Steps
    this.channel = core.getInput('channel')
    this.title = core.getInput('title')
    this.description = core.getInput('description')
  }
}