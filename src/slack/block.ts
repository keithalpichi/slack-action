import {
  SectionBlock as SB,
  HeaderBlock as HB,
  DividerBlock as DB,
  MrkdwnElement,
  PlainTextElement
} from '@slack/types'

export class MDownText implements MrkdwnElement {
  public type: 'mrkdwn' = 'mrkdwn'
  public text: string
  constructor(text: string) {
    this.text = text
  }
}

export class SectionBlock implements SB {
  public type: 'section' = 'section'
  public fields: MDownText[]
  constructor(text?: string[]) {
    this.fields = (text || []).map(t => new MDownText(t))
  }
}

export class FullSectionBlock implements SB {
  public type: 'section' = 'section'
  public text: MDownText
  constructor(text: string) {
    this.text = new MDownText(text)
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