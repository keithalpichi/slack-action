import * as os from 'os'
import { Github, Inputs, PlainOne, PlainTwo } from '../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../fixtures'
import { HeaderBlock, FullSectionBlock } from '../../src/slack'

describe('Github', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('does not build an unsupported event', () => {
    setInputEnvs({
      template: 'plain1'
    })
    const inputs = new Inputs()
    const event = Github.build('unknown', inputs)
    expect(event).toBeUndefined
  })

  test('should not build plain1 template when description is undefined', () => {
    process.stdout.write = jest.fn()
    setInputEnvs({
      template: 'plain1',
    })
    const inputs = new Inputs()
    Github.build('push', inputs)
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Invalid "description" input provided ' +
      'template "plain1". Please ensure it is a' +
      'non-empty string.' +
      os.EOL)
  })

  test('should build template to custom channel', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message",
      channel: '#pets'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainOne).toBeTruthy()
    expect((event as PlainOne).inputValidated).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.channel = '#pets'
  })

  test('should build plain1 template', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message"
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainOne).toBeTruthy()
    expect((event as PlainOne).inputValidated).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('this is a plain message')
  })

  test('should build plain1 template with custom title', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message",
      title: 'this is a plain title'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainOne).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('this is a plain title')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('this is a plain message')
  })

  test('should build plain2 template with no input status defined', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainTwo).toBeTruthy()
    expect((event as PlainTwo).inputValidated).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('should build plain2 template with input status defined', () => {
    setInputEnvs({
      template: 'plain2',
      title: 'success'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PlainTwo).toBeTruthy()
    const result = event.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('success')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })
})