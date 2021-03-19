import { LayoutTable, HeaderBlock, FullSectionBlock, SectionBlock } from '../../src/slack'
import { Inputs } from '../../src/github'
import { setInputEnvs, unsetInputEnvs } from '../fixtures'

describe('LayoutTable', () => {
  afterEach(() => {
    unsetInputEnvs()
  })

  test('creates an instance with default layout components', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    expect((lt.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(lt.blocks[1].type).toBe('divider')
    expect(lt.blocks[2] instanceof SectionBlock).toBeTruthy()
  })

  test('overrides title input', () => {
    setInputEnvs({
      template: 'plain2',
      title: 'Success'
    })
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    expect((lt.blocks[0] as HeaderBlock).text.text).toBe('Success')
  })

  test('provides description', () => {
    setInputEnvs({
      template: 'plain2',
      description: 'this is a description'
    })
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    expect((lt.blocks[2] instanceof FullSectionBlock)).toBeTruthy()
    expect((lt.blocks[2] as FullSectionBlock).text.text).toBe('this is a description')
  })

  test('adds cells to table section', () => {
    setInputEnvs({
      template: 'plain2',
    })
    const cell = '*Event*:\npush'
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    lt.addCell(cell)
    expect((lt.blocks[2] as SectionBlock).fields[0].text).toBe(cell)
  })

  test('contains description and a cell in the table section', () => {
    setInputEnvs({
      template: 'plain2',
      description: 'this is a description'
    })
    const cell = '*Event*:\npush'
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    lt.addCell(cell)
    expect((lt.blocks[2] as FullSectionBlock).text.text).toBe('this is a description')
    expect((lt.blocks[3] as SectionBlock).fields[0].text).toBe(cell)
  })

  test('throws error when trying to add more than 10 cells', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const cell = 'text'
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    for (let i = 0; i < 10; i++) {
      lt.addCell(cell)
    }
    expect(() => lt.addCell(cell)).toThrow(
      'Cannot add more than 10 cell items. ' +
      'See https://api.slack.com/reference/block-kit/blocks#section_fields ' +
      'for more details.')
  })

  test('concats cells to table section', () => {
    setInputEnvs({
      template: 'plain2',
    })
    const cell = '*Event*:\npush'
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    lt.concatCells([cell, cell])
    expect((lt.blocks[2] as SectionBlock).fields.length).toBe(2)
    expect((lt.blocks[2] as SectionBlock).fields[0].text).toBe(cell)
    expect((lt.blocks[2] as SectionBlock).fields[1].text).toBe(cell)
  })

  test('throws error when trying to concat more than 10 cells', () => {
    setInputEnvs({
      template: 'plain2'
    })
    const cell = 'text'
    const inputs = new Inputs()
    const lt = new LayoutTable(inputs)
    for (let i = 0; i < 10; i++) {
      lt.addCell(cell)
    }
    expect(() => lt.concatCells([cell])).toThrow(
      'Cannot add more than 10 cell items. ' +
      'See https://api.slack.com/reference/block-kit/blocks#section_fields ' +
      'for more details.')
  })
})