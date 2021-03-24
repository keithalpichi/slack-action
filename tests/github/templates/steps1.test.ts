import { Inputs, StepsOne, StepsInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'
import { HeaderBlock, FullSectionBlock } from '../../../src/slack'

describe('Steps1', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('creates a steps1 template with no optional inputs', () => {
    setInputEnvs({
      template: 'steps1',
      steps: '{ "Lint": {"outcome": "success"} }'
    })
    const inputs = new Inputs()
    const plain = new StepsOne(inputs as StepsInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('Steps Report')
    expect((result.blocks[3] as FullSectionBlock).text.text)
      .toBe(':white_check_mark: *Lint*: Success')
    expect((result.blocks[4] as FullSectionBlock).text.text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a steps1 template with description & title', () => {
    setInputEnvs({
      template: 'steps1',
      steps: '{ "Lint": {"outcome": "success"} }',
      description: "this is a plain message",
      title: 'this is a plain title'
    })
    const inputs = new Inputs()
    const plain = new StepsOne(inputs as StepsInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('this is a plain title')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('this is a plain message')
    expect((result.blocks[3] as FullSectionBlock).text.text)
      .toBe('Steps Report')
    expect((result.blocks[4] as FullSectionBlock).text.text)
      .toBe(':white_check_mark: *Lint*: Success')
    expect((result.blocks[5] as FullSectionBlock).text.text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a steps1 template with only required input', () => {
    setInputEnvs({
      template: 'steps1',
      steps: '{ ' +
        '"Install": {"outcome": "success"},' +
        '"Format": {"outcome": "cancelled"},' +
        '"Lint": {"outcome": "skipped"},' +
        '"Test": {"outcome": "failure"}' +
        ' }',
    })
    const inputs = new Inputs()
    const plain = new StepsOne(inputs as StepsInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('Steps Report')
    expect((result.blocks[3] as FullSectionBlock).text.text)
      .toBe(':white_check_mark: *Install*: Success')
    expect((result.blocks[4] as FullSectionBlock).text.text)
      .toBe(':no_entry: *Format*: Cancelled')
    expect((result.blocks[5] as FullSectionBlock).text.text)
      .toBe(':black_right_pointing_double_triangle_with_vertical_bar:' +
        ' *Lint*: Skipped')
    expect((result.blocks[6] as FullSectionBlock).text.text)
      .toBe(':x: *Test*: Failure')
  })

  test('creates a steps1 template with steps, description & title', () => {
    setInputEnvs({
      template: 'steps1',
      title: 'Title',
      description: 'Desc',
      steps: '{ ' +
        '"Install": {"outcome": "success"},' +
        '"Format": {"outcome": "cancelled"},' +
        '"Lint": {"outcome": "skipped"},' +
        '"Test": {"outcome": "failure"}' +
        ' }',
    })
    const inputs = new Inputs()
    const plain = new StepsOne(inputs as StepsInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Title')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as FullSectionBlock).text.text)
      .toBe('Desc')
    expect((result.blocks[3] as FullSectionBlock).text.text)
      .toBe('Steps Report')
    expect((result.blocks[4] as FullSectionBlock).text.text)
      .toBe(':white_check_mark: *Install*: Success')
    expect((result.blocks[5] as FullSectionBlock).text.text)
      .toBe(':no_entry: *Format*: Cancelled')
    expect((result.blocks[6] as FullSectionBlock).text.text)
      .toBe(':black_right_pointing_double_triangle_with_vertical_bar:' +
        ' *Lint*: Skipped')
    expect((result.blocks[7] as FullSectionBlock).text.text)
      .toBe(':x: *Test*: Failure')
  })
})