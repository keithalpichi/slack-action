import { StepOutcome } from '../github'

export class Markdown {
  static link(url: string, text: string): string {
    return `<${url}|${text}>`
  }

  static stepIcon(status: StepOutcome): string {
    if (status.toLowerCase() === 'success') return ':heavy_check_mark:'
    if (status.toLowerCase() === 'failure') return ':x:'
    if (status.toLowerCase() === 'cancelled') return ':exclamation:'
    if (status.toLowerCase() === 'skipped') return ':no_entry_sign:'
    return `:grey_question: ${status}`
  }
}