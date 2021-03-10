
import {
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain, Push } from './templates'

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
        return Plain.build(inputs)
      default:
        break
    }
    switch (eventName) {
      case 'push':
        return Push.build(inputs)
      default:
        return undefined
    }
  }
}
