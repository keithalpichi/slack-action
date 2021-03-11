import { Slack } from '../../src/slack'
import { Inputs, InputOptions } from '../../src/github'
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
      template: 'plain1'
    })
    const inputs = new Inputs()
    const s = new Slack(webhookUrl, inputs)
    expect(s.webhookOptions.username).toBeUndefined
    expect(s.webhookOptions.icon_emoji).toBeUndefined
    expect(s.webhookOptions.icon_url).toBeUndefined
    expect(s.webhookOptions.channel).toBeUndefined
    expect(s.webhookOptions.text).toBeUndefined
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

  test('overwrites default message arguments', () => {
    const inputArgs = {
      template: 'plain1',
      channel: '#pets',
      username: 'sharky',
      icon_emoji: 'abc.com/emoji.png',
      icon_url: 'abc.com/icon.png',
      text: 'this is fallback text',
      link_names: true
    }
    setInputEnvs(inputArgs as InputOptions)
    const inputs = new Inputs()
    const s = new Slack(webhookUrl, inputs)
    expect(s.webhookOptions.username).toBe(inputArgs.username)
    expect(s.webhookOptions.icon_emoji).toBe(inputArgs.icon_emoji)
    expect(s.webhookOptions.icon_url).toBe(inputArgs.icon_url)
    expect(s.webhookOptions.channel).toBe(inputArgs.channel)
    expect(s.webhookOptions.text).toBe(inputArgs.text)
    expect(s.webhookOptions.link_names).toBe(inputArgs.link_names)
    // We haven't supported using agent... yet
    // ensure it's still undefined
    expect(s.webhookOptions.agent).toBeUndefined
  })
})