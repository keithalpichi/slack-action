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
      title: 'title',
      description: 'desc',
      status: 'success',
      channel: '#cicd',
      steps: '{ "Lint": {"outcome": "success"} }',
      username: 'sharky',
      icon_emoji: 'abc.com/emoji.png',
      icon_url: 'abc.com/icon.png',
      text: 'this is fallback text',
      link_names: true
    }
    setInputEnvs(inputArgs)
    const i = new Inputs()
    expect(i.title).toBe(inputArgs.title)
    expect(i.description).toBe(inputArgs.description)
    expect(i.status).toBe(inputArgs.status)
    expect(i.channel).toBe(inputArgs.channel)
    expect(i.steps).toEqual(JSON.parse(inputArgs.steps))
    expect(i.username).toBe(inputArgs.username)
    expect(i.icon_emoji).toBe(inputArgs.icon_emoji)
    expect(i.icon_url).toBe(inputArgs.icon_url)
    expect(i.text).toBe(inputArgs.text)
    expect(i.link_names).toBe(inputArgs.link_names)
  })
})