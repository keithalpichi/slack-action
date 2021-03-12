import * as os from 'os'
import { Inputs, PlainOne, PlainInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'
import { HeaderBlock, FullSectionBlock } from '../../../src/slack'

describe('Plain1', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('should not build plain1 template when description is undefined', () => {
    process.stdout.write = jest.fn()
    setInputEnvs({
      template: 'plain1',
    })
    const inputs = new Inputs()
    const plain = new PlainOne(inputs as PlainInputs)
    plain.validateInput()
    expect(plain.inputValidated).toBe(true)
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Invalid "description" input provided ' +
      'template "plain1". Please ensure it is a' +
      'non-empty string.' +
      os.EOL)
  })

  test('creates a message with plain1 template', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message"
    })
    const inputs = new Inputs()
    const plain = new PlainOne(inputs as PlainInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('this is a plain message')
  })

  test('creates a message with plain1 template and title', () => {
    setInputEnvs({
      template: 'plain1',
      description: "this is a plain message",
      title: 'this is a plain title'
    })
    const inputs = new Inputs()
    const plain = new PlainOne(inputs as PlainInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('this is a plain title')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('this is a plain message')
  })
})