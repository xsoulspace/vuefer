export const reduceHtmlClasses = ({ classes }: { classes: string[] }) => {
  const classesString = classes.reduce((previous, current) => {
    if (previous.includes(current)) return previous
    return `${previous} ${current}`
  })
  return classesString
}
