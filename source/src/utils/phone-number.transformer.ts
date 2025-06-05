export function ThaiMobilePhoneTransformer({value}: { value: string | number}) {
    let stringValue = String(value)
    const split = stringValue.split(',')
    if(split.length > 1) {
        return split.map(v => ThaiMobilePhoneTransformer({value: v})).join(', ')
    }

    stringValue = stringValue.replaceAll(/[-\s]/g,'')
    if(stringValue.length !== 10 && stringValue[0] === '0') {
        return stringValue.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3')
    }

    stringValue = stringValue.replace(/\+\d{2}/, '0')
    if(stringValue.length === 9) {
        stringValue = '0' + stringValue
    }
    return stringValue.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3')

}
