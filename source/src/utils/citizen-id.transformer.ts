
export function CitizenIdTransformer({value}): string {
    if(!value) {
        return ''
    }
    const stringValue = value.toString().replaceAll(/[-\s]/g,'')

    if(stringValue.length !== 13) {
        return stringValue
    }
    return stringValue.replace(/(\d)(\d{4})(\d{5})(\d{2})(\d)/, '$1-$2-$3-$4-$5')
}
