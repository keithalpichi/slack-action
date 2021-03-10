import {
  SectionBlock as SB,
  HeaderBlock as HB,
  DividerBlock as DB,
  MrkdwnElement,
  PlainTextElement
} from '@slack/types'

export class SectionBlock implements SB {
  public type: 'section' = 'section'
  public fields: MrkdwnElement[]
  constructor(text: string[]) {
    this.fields = text.map(t => ({
      type: 'mrkdwn',
      text: t
    }))
  }
}

export class HeaderBlock implements HB {
  public type: 'header' = 'header'
  public text: PlainTextElement
  constructor(text: string | PlainTextElement) {
    if (typeof (text) == 'string') {
      this.text = {
        type: 'plain_text',
        text
      }
    } else {
      this.text = text
    }
  }
}

export const DividerBlock: DB = {
  type: 'divider'
}