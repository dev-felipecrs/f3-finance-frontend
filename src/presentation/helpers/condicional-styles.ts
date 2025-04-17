export const condicionalStyles = (
  base: string | Array<string | undefined>,
  styles: Record<string, boolean>,
) => {
  const stylesToApply = Object.entries(styles)
    .filter(([, condicional]) => condicional)
    .map(([style]) => style)

  const baseStyles = Array.isArray(base)
    ? base.reduce((acc, style) => (style ? (acc += ` ${style}`) : acc), '')
    : base

  return `${baseStyles} ${stylesToApply.join(' ')}`
}
