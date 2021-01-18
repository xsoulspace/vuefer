import { ColorNames } from "./ColorNames";

export class Color {
  // TODO: replace to 32 bit
  hex: string;
  name: ColorNames;
  constructor({ hex, name }: { hex: string; name: ColorNames }) {
    this.hex = hex;
    this.name = name;
  }
  get backgroundCss() {
    return `bg-${this.name}`;
  }
}
