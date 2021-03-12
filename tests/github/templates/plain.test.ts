import { Inputs, Plain, PlainOne, PlainTwo, PlainInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'

describe('Plain', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('returns undefined for an unsupported plain template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs as PlainInputs)
    expect(plain).toBeUndefined
  })

  test('returns a PlainOne instance', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message"
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs as PlainInputs)
    expect(plain instanceof PlainOne).toBeTruthy()
  })

  test('returns a PlainTwo instance', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs as PlainInputs)
    expect(plain instanceof PlainTwo).toBeTruthy()
  })
})