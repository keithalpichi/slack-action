import { Github, Inputs, PlainOne, PlainTwo } from '../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs, unsetActionEnvs } from '../fixtures'

describe('Github', () => {
  const originalWrite = process.stdout.write
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
    unsetActionEnvs()
    process.stdout.write = originalWrite
  })

  test('exits with error for unsupported template', () => {
    process.env.GITHUB_EVENT_NAME = 'unknown'
    setInputEnvs({
      template: 'unknown'
    })
    const inputs = new Inputs()
    expect(() => Github.build(inputs)).toThrow(
      'The input "template" you provided ("unknown") is not recognized.')
  })

  test('throws error when required input for a template is undefined', () => {
    process.stdout.write = jest.fn()
    setInputEnvs({
      template: 'plain1',
    })
    const inputs = new Inputs()
    expect(() => Github.build(inputs)).toThrow(
      'Invalid "description" input provided ' +
      'template "plain1". Please ensure it is a ' +
      'non-empty string.')
  })

  test('should return PlainOne instance', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message"
    })
    const inputs = new Inputs()
    const event = Github.build(inputs)
    expect(event instanceof PlainOne).toBeTruthy()
    expect((event as PlainOne).inputValidated).toBeTruthy()
  })

  test('should return PlainTwo instance', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const event = Github.build(inputs)
    expect(event instanceof PlainTwo).toBeTruthy()
    expect((event as PlainTwo).inputValidated).toBeTruthy()
  })
})