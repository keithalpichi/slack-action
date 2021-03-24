
import {
  BaseGithubSlackAdapter,
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain, PlainInputs, Push, PushInputs, Steps, StepsInputs } from './templates'

export class Github {
  static build(inputs: Inputs): GithubSlackAdapter {
    switch (inputs.template) {
      case 'plain1':
      case 'plain2':
        return Plain.build(inputs as PlainInputs)
      case 'push1':
        return Push.build(inputs as PushInputs)
      case 'steps1':
        return Steps.build(inputs as StepsInputs)
      default:
        throw BaseGithubSlackAdapter.unsupportedTemplateErr(inputs.template)
    }
  }
}
