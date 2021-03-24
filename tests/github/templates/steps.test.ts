import { Inputs, Steps, StepsOne, StepsInputs, BaseGithubSlackAdapter } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs, unsetActionEnvs } from '../../fixtures'

describe('Steps', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
    unsetActionEnvs()
  })

  test('throws error for an unsupported Steps template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    expect(() => Steps.build(inputs as StepsInputs))
      .toThrow(BaseGithubSlackAdapter.unsupportedTemplateErr('unknown'))
  })

  test('returns a StepsOne instance', () => {
    setInputEnvs({
      template: 'steps1',
      steps: '{ "Lint": {"outcome": "success"} }'
    })
    const inputs = new Inputs()
    const steps = Steps.build(inputs as StepsInputs)
    expect(steps instanceof StepsOne).toBeTruthy()
  })

  test('throws error when steps input is not provided', () => {
    setInputEnvs({
      template: 'steps1'
    })
    const inputs = new Inputs()
    expect(() => Steps.build(inputs as StepsInputs)).toThrow(
      'Invalid "steps" input provided. ' +
      'Please ensure it is provided in the format ' +
      '"steps: ${{ toJson(steps) }}"')
  })
})