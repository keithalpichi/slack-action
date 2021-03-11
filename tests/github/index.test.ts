import { Github, PushOne, Inputs } from '../../src/github'
import { setInputEnvs, setActionEnvs } from '../fixtures'
import { HeaderBlock, SectionBlock } from '../../src/slack'

describe('Github', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  test('should build push1 template with no other inputs', () => {
    setInputEnvs({
      template: 'push1'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PushOne).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('should build push1 template with status defined', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PushOne).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Success')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('does not build an unsupported event', () => {
    setInputEnvs({
      template: 'push1'
    })
    const inputs = new Inputs()
    const event = Github.build('unknown', inputs)
    expect(event).toBeUndefined
  })
})