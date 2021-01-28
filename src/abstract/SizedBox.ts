import { EdgeInsetsStep } from '.'

enum SizeStep {
  max = 'full',
  min = 'min',
  auto = 'auto',
  screen = 'screen',
}

interface SizedBoxHeightI {
  height?: Maybe<EdgeInsetsStep>
}

export class SizedBoxHeight {
  height: EdgeInsetsStep | SizeStep
  constructor({ height }: SizedBoxHeightI) {
    this.height = height ?? SizeStep.max
  }
  static get default(): SizedBoxHeight {
    return new SizedBoxHeight({})
  }

  get css(): string {
    return `h-${this.height}`
  }
}
interface SizedBoxWidthI {
  width?: Maybe<EdgeInsetsStep>
}
export class SizedBoxWidth {
  width: EdgeInsetsStep | SizeStep
  constructor({ width }: SizedBoxWidthI) {
    this.width = width ?? SizeStep.max
  }
  static get default(): SizedBoxWidth {
    return new SizedBoxWidth({})
  }
  get css(): string {
    return `w-${this.width}`
  }
}
