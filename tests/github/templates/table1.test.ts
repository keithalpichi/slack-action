import * as os from 'os'
import { Inputs, TableOne, TableInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs, unsetActionEnvs } from '../../fixtures'
import { HeaderBlock, FullSectionBlock, SectionBlock, MDownText } from '../../../src/slack'

describe('Table1', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
    unsetActionEnvs()
  })

  test('should not build table1 template when status is undefined', () => {
    process.stdout.write = jest.fn()
    setInputEnvs({
      template: 'table1',
    })
    const inputs = new Inputs()
    const plain = new TableOne(inputs as TableInputs)
    plain.validateInput()
    expect(plain.inputValidated).toBe(true)
    expect(process.exitCode).toBe(1)
    expect(process.stdout.write).toHaveBeenNthCalledWith(1,
      '::error::' +
      'Invalid "status" input provided ' +
      'template "table1". Please ensure it is a ' +
      'non-empty string.' +
      os.EOL)
  })

  test('creates a message with table1 template and all required input', () => {
    setInputEnvs({
      template: 'table1',
      status: 'success'
    })
    const inputs = new Inputs()
    const plain = new TableOne(inputs as TableInputs)
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