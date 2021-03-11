import { Inputs, Plain } from '../../../src/github'
import { setInputEnvs, setActionEnvs } from '../../fixtures'
import { HeaderBlock, SectionBlock } from '../../../src/slack'

describe('Plain', () => {
  test('creates a message with plain1 template', () => {
    setActionEnvs()
    setInputEnvs({
      template: 'plain1',
      template_args: '{"message": "this is a plain message"}'
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe('this is a plain message')
  })

  test('creates a message with plain2 template', () => {
    setActionEnvs()
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a message with plain2 template and status header', () => {
    setActionEnvs()
    setInputEnvs({
      template: 'plain2',
      status: 'success'
    })
    const inputs = new Inputs()
    const plain = Plain.build(inputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Success')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })
})