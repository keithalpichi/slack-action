import { Inputs, Table, TableOne, TableInputs } from '../../../src/github'
import { setInputEnvs, setActionEnvs, unsetInputEnvs } from '../../fixtures'

describe('Table', () => {
  beforeEach(() => {
    setActionEnvs()
  })

  afterEach(() => {
    unsetInputEnvs()
  })

  test('returns undefined for an unsupported Table template', () => {
    setInputEnvs({
      template: 'unknown',
    })
    const inputs = new Inputs()
    const plain = Table.build(inputs as TableInputs)
    expect(plain).toBeUndefined
  })

  test('returns a TableOne instance', () => {
    setInputEnvs({
      template: 'table1',
    })
    const inputs = new Inputs()
    const plain = Table.build(inputs as TableInputs)
    expect(plain instanceof TableOne).toBeTruthy()
  })
})