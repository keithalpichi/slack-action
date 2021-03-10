import * as os from 'os'
import { run } from '../src/run'
import { setInputEnvs } from './fixtures'

describe('Main', () => {
  test('skips action & logs warning when process.env.SLACK_WEBHOOK_URL is undefined', async () => {
    process.stdout.write = jest.fn()
    expect(await run()).toBeUndefined
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::warning::' +
      'Missing "SLACK_WEBHOOK_URL" secret. Please ensure one exists ' +
      'in order for this Github Action to work.' +
      os.EOL)
  })

  test('skips action & logs warning when process.env.GITHUB_EVENT_NAME is not supported', async () => {
    setInputEnvs({
      template: 'plain1'
    })
    process.stdout.write = jest.fn()
    process.env.SLACK_WEBHOOK_URL = '1234abcd'
    process.env.GITHUB_EVENT_NAME = 'unknown'
    expect(await run()).toBeUndefined
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::warning::' +
      'Github event "unknown" not yet supported' +
      os.EOL)
  })
})