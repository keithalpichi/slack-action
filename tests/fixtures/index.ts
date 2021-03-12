import { InputOptions } from '../../src/github'

type Envs = { [key: string]: string }
type InputEnvKeys = keyof InputOptions;

function createActionInput(input: string): string {
  return `INPUT_${input.toUpperCase()}`
}

export function setProcessEnvs(envs: Envs, allow_undefined?: boolean): void {
  for (const key in envs) {
    if (envs[key] === undefined && !allow_undefined) {
      continue
    }
    process.env[key] = envs[key]
  }

}

export function unsetProcessEnvs(inputs: InputEnvKeys[]): void {
  for (const key of inputs) {
    if (process.env[key]) {
      delete process.env[key]
    }
  }
}

export const inputOptions: InputEnvKeys[] = [
  'template',
  'title',
  'description',
  'status',
  'channel',
  'steps',
  'username',
  'icon_emoji',
  'icon_url',
  'text',
  'link_names'
]

export function setInputEnvs(inputs: InputOptions): void {
  inputs = { ...inputs }
  for (const key in inputs) {
    if (inputs[key] === undefined) {
      delete inputs[key]
      continue
    }
    inputs[createActionInput(key)] = inputs[key]
    delete inputs[key]
  }
  setProcessEnvs(inputs)
}

export function unsetInputEnvs(inputs?: InputEnvKeys[]): void {
  if (!inputs || !inputs.length) {
    inputs = inputOptions
  }
  unsetProcessEnvs(inputs.map(i => createActionInput(i) as InputEnvKeys))
}

export const githubActionActionEnvs = {
  GITHUB_REPOSITORY: 'user/repo',
  GITHUB_SERVER_URL: 'https://github.com',
  GITHUB_RUN_ID: '1',
  GITHUB_RUN_NUMBER: '2',
  GITHUB_JOB: 'build',
  GITHUB_EVENT_NAME: 'push',
  GITHUB_WORKFLOW: 'workflow',
  GITHUB_SHA: 'a03023nde0a92n',
  GITHUB_REF: 'refs/heads/master',
  GITHUB_HEAD_REF: '',
  GITHUB_ACTOR: 'user'
}

export function setActionEnvs(inputs?: Envs): void {
  if (!inputs) {
    inputs = githubActionActionEnvs
  }
  setProcessEnvs(inputs)
}

export function unsetActionEnvs(): void {
  for (const key in process.env) {
    if (key.startsWith('GITHUB_') && process.env[key]) {
      delete process.env[key]
    }
  }
}