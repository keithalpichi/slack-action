import { Inputs, Push, PushOne, PushInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'

describe('Push', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('returns undefined for an unsupported Push template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    const plain = Push.build(inputs as PushInputs)
    expect(plain).toBeUndefined
  })

  test('returns a TableOne instance', () => {
    setInputEnvs({
      template: 'push1',
    })
    const inputs = new Inputs()
    const plain = Push.build(inputs as PushInputs)
    expect(plain instanceof PushOne).toBeTruthy()
  })
})