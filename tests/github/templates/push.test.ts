import { Inputs, Push, PushOne, PushInputs, BaseGithubSlackAdapter } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'

describe('Push', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('throws error for an unsupported Push template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    expect(() => Push.build(inputs as PushInputs))
      .toThrow(BaseGithubSlackAdapter.unsupportedTemplateErr('unknown'))
  })

  test('returns a PushOne instance', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    const plain = Push.build(inputs as PushInputs)
    expect(plain instanceof PushOne).toBeTruthy()
  })
})