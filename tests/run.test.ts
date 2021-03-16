import * as os from 'os'
import { run } from '../src/run'
import { setInputEnvs } from './fixtures'

describe('Main', () => {
  const originalWrite = process.stdout.write
  beforeEach(() => {
    delete process.env.SLACK_WEBHOOK_URL
  })
  afterEach(() => {
    delete process.env.SLACK_WEBHOOK_URL
    delete process.env.GITHUB_EVENT_NAME
    process.stdout.write = originalWrite
  })

  test('sets job to failed when process.env.SLACK_WEBHOOK_URL is undefined', async () => {
    process.stdout.write = jest.fn()
    await run()
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Missing "SLACK_WEBHOOK_URL" secret. Please ensure one exists ' +
      'in order for this Github Action to work.' +
      os.EOL)
  })

  test('sets job to failed when template is not recognized', async () => {
    setInputEnvs({
      template: 'unknown',
    })
    process.stdout.write = jest.fn()
    process.env.SLACK_WEBHOOK_URL = '1234abcd'
    process.env.GITHUB_EVENT_NAME = 'unknown'
    await run()
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenCalled()
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      `The input "template" you provided ("unknown") ` +
      'is not recognized.' +
      os.EOL)
  })

  test('sets job to failed when required inputs are invalid for template', async () => {
    setInputEnvs({
      template: 'plain1',
    })
    process.stdout.write = jest.fn()
    process.env.SLACK_WEBHOOK_URL = '1234abcd'
    process.env.GITHUB_EVENT_NAME = 'unknown'
    await run()
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Invalid "description" input provided ' +
      'template "plain1". Please ensure it is a ' +
      'non-empty string.' +
      os.EOL)
  })
})