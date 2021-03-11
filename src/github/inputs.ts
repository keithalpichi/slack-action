import * as core from '@actions/core'
import { Steps } from '../github'

export class Inputs {
  template: string
  status: string
  title: string
  steps: Steps
  channel: string
  template_args: any

  constructor() {
    this.template = core.getInput('template', { required: true })
    this.status = core.getInput('status')
    this.steps = JSON.parse(core.getInput('steps') || '{}') as Steps
    this.channel = core.getInput('channel')
    this.title = core.getInput('title')
    this.template_args = JSON.parse(core.getInput('template_args') || '{}')
  }
}