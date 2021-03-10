import {
  Steps, GithubSlackAdapter,
  Status, StepOutcome
} from './adapter'
import { Inputs } from './inputs'
import { Plain, Push } from './templates'

export class Github {
  static build(jobName: string, inputs: Inputs): GithubSlackAdapter | undefined {
    if (!jobName) {
      return undefined
    }
    switch (inputs.template) {
      case 'plain1':
        return Plain.build(inputs)
      default:
        break
    }
    switch (jobName) {
      case 'push':
        return Push.build(inputs)
      default:
        return undefined
    }
  }
}

export * from './templates'
export {
  Steps,
  Inputs,
  Status,
  StepOutcome
}