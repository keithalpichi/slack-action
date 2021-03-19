
import {
  BaseGithubSlackAdapter,
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain, PlainInputs, Push, PushInputs } from './templates'

export class Github {
  static build(inputs: Inputs): GithubSlackAdapter {
    switch (inputs.template) {
      case 'plain1':
      case 'plain2':
        return Plain.build(inputs as PlainInputs)
      case 'push1':
        return Push.build(inputs as PushInputs)
      default:
        throw BaseGithubSlackAdapter.unsupportedTemplateErr(inputs.template)
    }
  }
}
