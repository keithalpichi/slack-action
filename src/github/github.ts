
import {
  GithubSlackAdapter,
} from './adapter'
import { Inputs } from './inputs'
import { Plain, PlainInputs } from './templates'

export class Github {
  static build(inputs: Inputs): GithubSlackAdapter | undefined {
    switch (inputs.template) {
      case 'plain1':
      case 'plain2':
        return Plain.build(inputs as PlainInputs)
      default:
        break
    }
  }
}
