import { Maybe } from '..'

export const unifyValue = ({
  str,
  toLowerCase,
}: {
  str: Maybe<unknown>
  toLowerCase?: Maybe<boolean>
}): string => {
  if (str == null) return ''
  const result = ((): string => {
    const regExp = /[a-zA-ZА-Яа-я0-9]+/g
    const guardedStr = JSON.stringify(str)
    const matched = guardedStr.match(regExp)
    if (matched == null) return ''
    if (matched[0] == guardedStr) return guardedStr
    return matched.join('')
  })()
  return toLowerCase == null || toLowerCase == true
    ? result.toLowerCase()
    : result
}
