import { Markdown } from '../../src/slack'

describe('Markdown', () => {
  test('creates link', () => {
    expect(Markdown.link('www.google.com', 'Google'))
      .toBe('<www.google.com|Google>')
  })

  test('creates step icons', () => {
    expect(Markdown.stepIcon('success')).toBe(':heavy_check_mark:')
    expect(Markdown.stepIcon('failure')).toBe(':x:')
    expect(Markdown.stepIcon('cancelled')).toBe(':exclamation:')
    expect(Markdown.stepIcon('skipped')).toBe(':no_entry_sign:')
  })
})