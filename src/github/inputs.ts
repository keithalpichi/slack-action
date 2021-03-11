import * as core from '@actions/core'
import { Steps } from '../github'

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