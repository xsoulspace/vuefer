import { Maybe } from './BasicTypes'
import { EdgeInsetsStep } from './EdgeInsets'

export enum SizeBoxStep {
  max = 'full',
  min = 'min',
  auto = 'auto',
  screen = 'screen',
}

interface SizedBoxHeightI {
  height?: Maybe<EdgeInsetsStep | SizeBoxStep>
}

export class SizedBoxHeight {
  height: EdgeInsetsStep | SizeBoxStep
  constructor({ height }: SizedBoxHeightI) {
    this.height = height ?? SizeBoxStep.max
  }
  static get default(): SizedBoxHeight {
    return new SizedBoxHeight({})
  }

  get css(): string {
    return `h-${this.height}`
  }
}
interface SizedBoxWidthI {
  width?: Maybe<EdgeInsetsStep | SizeBoxStep>
}
export class SizedBoxWidth {
  width: EdgeInsetsStep | SizeBoxStep
  constructor({ width }: SizedBoxWidthI) {
    this.width = width ?? SizeBoxStep.max
  }
  static get default(): SizedBoxWidth {
    return new SizedBoxWidth({})
  }
  get css(): string {
    return `w-${this.width}`
  }
}
