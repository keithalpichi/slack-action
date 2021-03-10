import { GithubSlackAdapter } from '../adapter'
import { Inputs } from '../inputs'
import { PlainOne } from './plain'

export class Plain {
  static build(inputs: Inputs): GithubSlackAdapter | undefined {
    switch (inputs.template) {
      case 'plain1':
        return new PlainOne(inputs)
      default:
        return undefined
    }
  }
}

export * from './push'
export {
  PlainOne
}