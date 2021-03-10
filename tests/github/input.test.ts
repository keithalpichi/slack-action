import { Inputs } from '../../src/github'
import { githubActionInputEnvs, setInputEnvs } from '../fixtures'

describe('Inputs', () => {
  test('required inputs provided to Github Action', () => {
    setInputEnvs({
      template: '1'
    })
    const i = new Inputs()
    expect(i.template).toBe(githubActionInputEnvs.template)
  })

  test('optional inputs provided to Github Action', () => {
    setInputEnvs(githubActionInputEnvs)
    const i = new Inputs()
    expect(i.status).toBe(githubActionInputEnvs.status)
    expect(i.channel).toBe(githubActionInputEnvs.channel)
    expect(i.steps).toEqual(JSON.parse(githubActionInputEnvs.steps))
    expect(i.template_args).toEqual(JSON.parse(githubActionInputEnvs.template_args))
  })
})