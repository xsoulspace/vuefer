// TODO: implement key generation
export class Key {
  constructor(public value: string) {}
  static fromNumber(numb: number) {
    return new Key(numb.toString())
  }
}
