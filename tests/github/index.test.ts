import { Github, PushOne, Inputs } from '../../src/github'
import { setInputEnvs } from '../fixtures'

describe('Github', () => {
  test('should build based on push event with template push1', () => {
    setInputEnvs({
      template: 'push1'
    })
    const inputs = new Inputs()
    const event = Github.build('push', inputs)
    expect(event instanceof PushOne).toBeTruthy()
  })

  test('does not build an unsupported event', () => {
    setInputEnvs({
      template: 'push1'
    })
    const inputs = new Inputs()
    const event = Github.build('unknown', inputs)
    expect(event).toBeUndefined
  })
})