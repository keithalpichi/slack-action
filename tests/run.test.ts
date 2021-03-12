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

  test('skips action & logs warning when process.env.SLACK_WEBHOOK_URL is undefined', async () => {
    process.stdout.write = jest.fn()
    expect(await run()).toBeUndefined
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::warning::' +
      'Missing "SLACK_WEBHOOK_URL" secret. Please ensure one exists ' +
      'in order for this Github Action to work.' +
      os.EOL)
  })

  test('sets job to failed when required inputs are not provided', async () => {
    // TODO: Need a better way to test actual output of stdout
    process.stdout.write = jest.fn()
    process.env.SLACK_WEBHOOK_URL = '1234abcd'
    expect(await run()).toBeUndefined
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenCalled()
  })

  test('skips action & logs warning when template is not recognized', async () => {
    // TODO: Need a better way to test actual output of stdout
    setInputEnvs({
      template: 'unknown',
    })
    process.stdout.write = jest.fn()
    process.env.SLACK_WEBHOOK_URL = '1234abcd'
    process.env.GITHUB_EVENT_NAME = 'unknown'
    expect(await run()).toBeUndefined
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenCalled()
  })
  // expect(process.stdout.write).toHaveBeenNthCalledWith(1,
  //   '::warning::' +
  //   'Github Action template "unknown" not recognized.' +
  //   os.EOL)
  // })
})