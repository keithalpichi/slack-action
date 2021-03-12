import * as os from 'os'
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

  test('returns undefined for an unsupported event', () => {
    process.env.GITHUB_EVENT_NAME = 'unknown'
    setInputEnvs({
      template: 'plain1'
    })
    const inputs = new Inputs()
    const event = Github.build(inputs)
    expect(event).toBeUndefined
  })

  test('should exit with error when required input for a template is undefined', () => {
    process.stdout.write = jest.fn()
    setInputEnvs({
      template: 'plain1',
    })
    const inputs = new Inputs()
    Github.build(inputs)
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Invalid "description" input provided ' +
      'template "plain1". Please ensure it is a ' +
      'non-empty string.' +
      os.EOL)
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