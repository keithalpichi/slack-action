import { PlainTemplateIDs } from '../../src/github'

type InputEnvs = {
  template: PlainTemplateIDs,
  template_args?: string,
  status?: string,
  title?: string
  channel?: string,
  steps?: string
}

type Envs = { [key: string]: string }
type InputEnvKeys = keyof InputEnvs;

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

export const githubActionInputEnvs: InputEnvs = {
  template: 'plain1',
  template_args: '{}',
  title: '',
  status: 'success',
  channel: '#cicd',
  steps: '{ "Lint": {"outcome": "success"} }'
}

export function setInputEnvs(inputs: InputEnvs): void {
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
    inputs = Object.keys(githubActionInputEnvs).map(k => k) as InputEnvKeys[]
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