
import {
  BaseGithubSlackAdapter,
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain, PlainInputs } from './templates'

export class Github {
  static build(inputs: Inputs): GithubSlackAdapter {
    switch (inputs.template) {
      case 'plain1':
      case 'plain2':
        return Plain.build(inputs as PlainInputs)
      default:
        throw BaseGithubSlackAdapter.unsupportedTemplateErr(inputs.template)
    }
  }
}
