import { template } from '@blakeembrey/template'

export const substitute = (templateStr: string, substitutions: { [x: string]: string }) => {
    if (!Object.keys(substitutions).length) return templateStr
    const fn = template(templateStr)
    return fn(substitutions)
}
