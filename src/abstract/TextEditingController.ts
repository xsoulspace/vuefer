import { ref, Ref } from 'vue'

interface TextEditingControllerI {
  text?: Maybe<string>
  obscureText?: Maybe<boolean>
  readOnly?: Maybe<boolean>
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
}
//  TODO: add properties
export class TextEditingController {
  text: Ref<string> = ref('')
  obscureText: boolean
  readOnly: boolean
  maxLength?: Maybe<number>
  maxLines?: Maybe<number>
  constructor({
    text,
    obscureText,
    readOnly,
    maxLines,
    maxLength,
  }: TextEditingControllerI) {
    this.text.value = text ?? ''
    this.obscureText = obscureText ?? false
    this.readOnly = readOnly ?? false
    this.maxLength = maxLength
    this.maxLines = maxLines ?? 1
  }

  static get default(): TextEditingController {
    return new TextEditingController({})
  }

  get css(): string {
    return ''
  }
}
