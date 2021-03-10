import {
  SectionBlock,
  HeaderBlock,
  DividerBlock,
} from '../../src/slack'

describe('Block', () => {
  test('creates divider block', () => {
    expect(DividerBlock).toEqual({
      type: 'divider'
    })
  })

  test('creates header block from string', () => {
    const b = new HeaderBlock('# Title')
    expect(b.text).toEqual({ text: '# Title', type: 'plain_text' })
    expect(b.type).toBe('header')
  })

  test('creates header block with PlainTextElement', () => {
    const b = new HeaderBlock({ text: '# Title', type: 'plain_text' })
    expect(b.text).toEqual({ text: '# Title', type: 'plain_text' })
    expect(b.type).toBe('header')
  })

  test('creates section block', () => {
    const b = new SectionBlock([
      '# top',
      '# bottom'
    ])
    expect(b.type).toBe('section')
    expect(b.fields[0]).toEqual({ text: '# top', type: 'mrkdwn' })
    expect(b.fields[1]).toEqual({ text: '# bottom', type: 'mrkdwn' })
  })
})