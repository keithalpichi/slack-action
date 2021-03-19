import { Inputs, Push, PushOne, PushInputs, BaseGithubSlackAdapter } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs, unsetActionEnvs } from '../../fixtures'

describe('Push', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
    unsetActionEnvs()
  })

  test('throws error for an unsupported Push template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    expect(() => Push.build(inputs as PushInputs))
      .toThrow(BaseGithubSlackAdapter.unsupportedTemplateErr('unknown'))
  })

  test('throws error when event is not a push', () => {
    setActionEnvs({
      GITHUB_EVENT_NAME: 'pull'
    })
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    expect(() => Push.build(inputs as PushInputs))
      .toThrow(
        `Only push events are supported by the push1 template. ` +
        `This template is being used in a pull event.`)
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