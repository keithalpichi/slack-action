import { Inputs, InputOptions } from '../../src/github'
import { setInputEnvs, unsetInputEnvs } from '../fixtures'

describe('Inputs', () => {
  afterEach(() => {
    unsetInputEnvs()
  })

  test('required inputs provided to Github Action', () => {
    setInputEnvs({
      template: 'plain1'
    })
    const i = new Inputs()
    expect(i.template).toBe('plain1')
  })

  test('optional inputs provided to Github Action', () => {
    const inputArgs: InputOptions = {
      template: 'plain1',
      title: '',
      description: '',
      status: 'success',
      channel: '#cicd',
      steps: '{ "Lint": {"outcome": "success"} }'
    }
    setInputEnvs(inputArgs)
    const i = new Inputs()
    expect(i.title).toBe(inputArgs.title)
    expect(i.description).toBe(inputArgs.description)
    expect(i.status).toBe(inputArgs.status)
    expect(i.channel).toBe(inputArgs.channel)
    expect(i.steps).toEqual(JSON.parse(inputArgs.steps))
  })
})