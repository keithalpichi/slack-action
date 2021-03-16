import {
  KnownBlock,
  Block,
} from '@slack/types'
import { HeaderBlock, DividerBlock, FullSectionBlock, SectionBlock, MDownText } from './block'
import { Inputs } from '../github'

export class LayoutTable {
  public blocks: (KnownBlock | Block)[]
  constructor(inputs: Inputs) {
    this.blocks = [
      new HeaderBlock(inputs.title),
      DividerBlock,
    ]
    if (inputs.description.length) {
      this.blocks.push(new FullSectionBlock(inputs.description))
    }
    this.blocks.push(new SectionBlock())
  }

  addCell(text: string): void {
    const sb = this.blocks[this.blocks.length - 1] as SectionBlock
    if (sb.fields.length === 10) {
      throw new Error(
        'Cannot add more than 10 cell items. ' +
        'See https://api.slack.com/reference/block-kit/blocks#section_fields ' +
        'for more details.')
    }
    sb.fields.push(new MDownText(text))
  }

  concatCells(text: string[]): void {
    const sb = this.blocks[this.blocks.length - 1] as SectionBlock
    if (sb.fields.length === 10 || sb.fields.length + text.length > 10) {
      throw new Error(
        'Cannot add more than 10 cell items. ' +
        'See https://api.slack.com/reference/block-kit/blocks#section_fields ' +
        'for more details.')
    }
    sb.fields = sb.fields.concat(text.map(t => new MDownText(t)))
  }
}