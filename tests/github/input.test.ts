import { Inputs } from '../../src/github'
import { githubActionInputEnvs, setInputEnvs, unsetInputEnvs } from '../fixtures'

describe('Inputs', () => {
  afterEach(() => {
    unsetInputEnvs()
  })

  test('required inputs provided to Github Action', () => {
    setInputEnvs({
      template: 'plain1'
    })
    const i = new Inputs()
    expect(i.template).toBe(githubActionInputEnvs.template)
  })

  test('optional inputs provided to Github Action', () => {
    setInputEnvs(githubActionInputEnvs)
    const i = new Inputs()
    expect(i.title).toBe(githubActionInputEnvs.title)
    expect(i.status).toBe(githubActionInputEnvs.status)
    expect(i.channel).toBe(githubActionInputEnvs.channel)
    expect(i.steps).toEqual(JSON.parse(githubActionInputEnvs.steps))
    expect(i.template_args).toEqual(JSON.parse(githubActionInputEnvs.template_args))
  })
})