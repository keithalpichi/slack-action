import { Inputs, Push } from '../../../src/github'
import { setInputEnvs, setActionEnvs } from '../../fixtures'
import { HeaderBlock, SectionBlock } from '../../../src/slack'

describe('Push', () => {
  test('creates a slack message with template push1', () => {
    setActionEnvs()
    setInputEnvs({
      status: 'success',
      template: 'push1'
    })
    const inputs = new Inputs()
    const push = Push.build(inputs)
    const result = push.createSlackMessage()
    expect((result.blocks[0] as HeaderBlock).text.text).toBe('Success')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })
})