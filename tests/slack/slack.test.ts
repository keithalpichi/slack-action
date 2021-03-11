import { Slack } from '../../src/slack'
import { Inputs } from '../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../fixtures'

describe('Slack', () => {
  const webhookUrl = 'abc.com/def'
  beforeEach(() => {
    setActionEnvs()
  })

  beforeEach(() => {
    unsetInputEnvs()
  })

  test('initializes with default inputs', () => {
    setInputEnvs({
      template: 'plain1',
      channel: undefined
    })
    const inputs = new Inputs()
    const s = new Slack(webhookUrl, inputs)
    expect(s.webhookOptions.username).toBeUndefined
    expect(s.webhookOptions.icon_emoji).toBeUndefined
    expect(s.webhookOptions.icon_url).toBeUndefined
    expect(s.webhookOptions.channel).toBeUndefined
    expect(s.webhookOptions.link_names).toBeUndefined
    expect(s.webhookOptions.agent).toBeUndefined
  })

  test('initializes with inputs', () => {
    setInputEnvs({
      template: 'plain1',
      channel: '#pets'
    })
    const inputs = new Inputs()
    const s = new Slack(webhookUrl, inputs)
    expect(s.webhookOptions.channel).toBe('#pets')
  })
})