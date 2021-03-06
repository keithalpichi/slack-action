import { Inputs, PushOne, PushInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs, unsetActionEnvs } from '../../fixtures'
import { HeaderBlock, FullSectionBlock, SectionBlock, MDownText } from '../../../src/slack'

describe('PushOne', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
    unsetActionEnvs()
  })

  test('throws error when status is undefined', () => {
    setInputEnvs({
      template: 'push1',
    })
    const inputs = new Inputs()
    expect(() => new PushOne(inputs as PushInputs))
      .toThrow(
        'Invalid "status" input provided ' +
        'template "push1". Please ensure it is a ' +
        'non-empty string.')
  })

  test('throws error when event is not a push', () => {
    setActionEnvs({
      GITHUB_EVENT_NAME: 'pull'
    })
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    expect(() => new PushOne(inputs as PushInputs))
      .toThrow(
        `Only push events are supported by the push1 template. ` +
        `This template is being used in a pull event.`)
  })


  test('has a default title provided by default input title', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    const plain = new PushOne(inputs as PushInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
  })

  test('overrides default title', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success',
      title: 'All green!'
    })
    const inputs = new Inputs()
    const plain = new PushOne(inputs as PushInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('All green!')
  })

  test('adds a description', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success',
      description: 'description'
    })
    const inputs = new Inputs()
    const plain = new PushOne(inputs as PushInputs)
    const result = plain.createSlackMessage()
    expect(result.blocks[2] instanceof FullSectionBlock).toBeTruthy()
    expect((result.blocks[2] as FullSectionBlock).text.text).toBe('description')
  })

  test('creates a message with push1 template and all required input', () => {
    setInputEnvs({
      template: 'push1',
      status: 'success'
    })
    const inputs = new Inputs()
    const plain = new PushOne(inputs as PushInputs)
    const result = plain.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Github Action')
    expect(result.blocks[1].type).toBe('divider')
    expect(result.blocks[2] instanceof SectionBlock).toBeTruthy()
    expect((result.blocks[2] as SectionBlock).fields.length).toBe(9)
    const table = (result.blocks[2] as SectionBlock)
    const tableExpectations = [
      '*Repo:*\nuser/repo',
      '*Ref:*\nmaster',
      '*Workflow:*\nworkflow',
      '*Job:*\nbuild',
      '*Event:*\npush',
      '*Status:*\nsuccess',
      '*Commit Hash:*\na03023nd',
      '*Run ID:*\n1',
      '*Run Number:*\n<https://github.com/user/repo/actions/runs/1|2>'
    ]
    tableExpectations.forEach((e, i) => {
      expect(table.fields[i] instanceof MDownText).toBeTruthy()
      expect(table.fields[i].text).toBe(e)
    })
  })
})