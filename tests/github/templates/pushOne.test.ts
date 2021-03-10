import { Inputs, PushOne } from '../../../src/github'
import { setInputEnvs, setActionEnvs } from '../../fixtures'
import { HeaderBlock, SectionBlock } from '../../../src/slack'

describe('PushOne', () => {
  beforeAll(() => {
    setActionEnvs()
  })

  test('creates a slack message with succeeded status', () => {
    setInputEnvs({
      template: '1',
      status: 'success'
    })
    const inputs = new Inputs()
    const push = new PushOne(inputs)
    const result = push.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Success')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a slack message with failure status', () => {
    setInputEnvs({
      template: '1',
      status: 'failure'
    })
    const inputs = new Inputs()
    const push = new PushOne(inputs)
    const result = push.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Failure')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a slack message with cancelled status', () => {
    setInputEnvs({
      template: '1',
      status: 'cancelled'
    })
    const inputs = new Inputs()
    const push = new PushOne(inputs)
    const result = push.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Cancelled')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  test('creates a slack message with skipped status', () => {
    setInputEnvs({
      template: '1',
      status: 'skipped'
    })
    const inputs = new Inputs()
    const push = new PushOne(inputs)
    const result = push.createSlackMessage()
    const header = result.blocks[0]
    expect((header as HeaderBlock).text.text).toBe('Skipped')
    expect(result.blocks[1].type).toBe('divider')
    expect((result.blocks[2] as SectionBlock).fields[0].text)
      .toBe(
        '<https://github.com/user/repo/actions/runs/1|' +
        'https://github.com/user/repo/actions/runs/1>'
      )
  })

  // test('creates a slack message', () => {
  //   setInputEnvs({
  //     steps: undefined
  //   })
  //   const inputs = new Inputs()
  //   const push = new Push(inputs)
  //   const result = push.createSlackMessage()
  //   expect(result.channel)
  //   const header = result.blocks[0]
  //   expect(header).toEqual({
  //     type: 'header',
  //     text: {
  //       type: 'plain_text',
  //       text: 'Github Action Workflow Succeeded',
  //       emoji: undefined
  //     }
  //   })
  //   const divider = result.blocks[1]
  //   expect(divider).toEqual({
  //     type: 'divider'
  //   })
  //   const summary = result.blocks[2]
  //   expect(summary).toEqual({
  //     type: 'section',
  //     fields: [
  //       {
  //         type: 'mrkdwn',
  //         text: '<https://github.com/user/repo/actions/runs/1|https://github.com/user/repo/actions/runs/1>'
  //       }
  //     ]
  //   })
  // })

  // test('creates a slack message with failing step', () => {
  //   setInputEnvs({
  //     steps: createStep('Lint', 'failure')
  //   })
  //   const inputs = new Inputs()
  //   const push = new Push(inputs)
  //   const result = push.createSlackMessage()
  //   expect(result.blocks[3]).toEqual({
  //     type: 'section',
  //     fields: [
  //       {
  //         type: 'mrkdwn',
  //         text: ':x:: Lint'
  //       }
  //     ]
  //   })
  // })

  // test('creates a slack message with successful step', () => {
  //   setInputEnvs({
  //     steps: createStep('Lint', 'success')
  //   })
  //   const inputs = new Inputs()
  //   const push = new Push(inputs)
  //   const result = push.createSlackMessage()
  //   expect(result.blocks[3]).toEqual({
  //     type: 'section',
  //     fields: [
  //       {
  //         type: 'mrkdwn',
  //         text: ':heavy_check_mark:: Lint'
  //       }
  //     ]
  //   })
  // })

  // test('creates a slack message with a cancelled step', () => {
  //   setInputEnvs({
  //     steps: createStep('Lint', 'cancelled')
  //   })
  //   const inputs = new Inputs()
  //   const push = new Push(inputs)
  //   const result = push.createSlackMessage()
  //   expect(result.blocks[3]).toEqual({
  //     type: 'section',
  //     fields: [
  //       {
  //         type: 'mrkdwn',
  //         text: ':exclamation:: Lint'
  //       }
  //     ]
  //   })
  // })

  // test('creates a slack message with a skipped step', () => {
  //   setInputEnvs({
  //     steps: createStep('Lint', 'skipped')
  //   })
  //   const inputs = new Inputs()
  //   const push = new Push(inputs)
  //   const result = push.createSlackMessage()
  //   expect(result.blocks[3]).toEqual({
  //     type: 'section',
  //     fields: [
  //       {
  //         type: 'mrkdwn',
  //         text: ':no_entry_sign:: Lint'
  //       }
  //     ]
  //   })
  // })
})