type Envs = { [key: string]: string }

export function setProcessEnvs(envs: Envs, allow_undefined?: boolean): void {
  for (const key in envs) {
    if (envs[key] === undefined && !allow_undefined) {
      continue
    }
    process.env[key] = envs[key]
  }

}

export const githubActionInputEnvs = {
  template: '1',
  template_args: '{}',
  status: 'success',
  channel: '#cicd',
  steps: '{ "Lint": {"outcome": "success"} }'
}

export function setInputEnvs(inputs: Envs) {
  inputs = { ...inputs }
  for (const key in inputs) {
    if (inputs[key] === undefined) {
      delete inputs[key]
      continue
    }
    inputs[`INPUT_${key.toUpperCase()}`] = inputs[key]
    delete inputs[key]
  }
  setProcessEnvs(inputs)
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

export function setActionEnvs(inputs?: Envs) {
  if (!inputs) {
    inputs = githubActionActionEnvs
  }
  setProcessEnvs(inputs)
}