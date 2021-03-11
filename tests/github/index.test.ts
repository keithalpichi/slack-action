import { Github, Inputs, PlainOne, PlainTwo } from '../../src/github'
import { setInputEnvs, setActionEnvs } from '../fixtures'
import { HeaderBlock, SectionBlock } from '../../src/slack'

describe('Github', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  test('does not build an unsupported event', () => {
    setInputEnvs({
      template: 'plain1'
    })
    const inputs = new Inputs()
    const event = Github.build('unknown', inputs)
    expect(event).toBeUndefined
  })

  test('should build plain1 template', () => {
    setInputEnvs({
      template: 'plain1',
      template_args: '{"message": "this is a plain message"}'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainOne).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe('this is a plain message')
  })

  test('should build plain2 template with no input status defined', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainTwo).toBeTruthy()
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

  test('should build plain2 template with input status defined', () => {
    setInputEnvs({
      template: 'plain2',
      status: 'success'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainTwo).toBeTruthy()
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
})