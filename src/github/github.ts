
import {
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain } from './templates'

export class Github {
  static supportedEvents = new Set([
    'push'
  ])
  static build(eventName: string, inputs: Inputs): GithubSlackAdapter | undefined {
    if (!eventName || !eventName.length || !Github.supportedEvents.has(eventName)) {
      return undefined
    }
    switch (inputs.template) {
      case 'plain1':
      case 'plain2':
        return Plain.build(inputs)
      default:
        break
    }
  }
}
