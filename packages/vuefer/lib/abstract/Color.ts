import { ColorNames } from './ColorNames'

export class Color {
  // TODO: replace to 32 bit
  hex: string
  name: ColorNames
  constructor({ hex, name }: { hex?: string; name?: ColorNames }) {
    this.hex = hex ?? '#000'
    this.name = name ?? ColorNames.black
  }
  get backgroundCss() {
    return `bg-${this.name}`
  }
  get hoverBackgroundCss() {
    return `hover:${this.backgroundCss}`
  }
  get focusCss() {
    return `focus:ring-2 focus:ring-${this.name}`
  }
  get textCss() {
    return `text-${this.name}`
  }
  get highlightCss() {
    return `active:${this.backgroundCss}`
  }
}
