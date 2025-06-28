export class NumberUtil {
    public static validateCheckSum(numberString: string): boolean {
        const cleanValue = numberString.replace(/\D/g, '').split('')
        const length = cleanValue.length
        if(length < 2) {
            return false
        }
        const checksumValue = cleanValue.pop()

        const sum = cleanValue.reduce((acc, currentValue, currentIndex) => {
            return acc + Number(currentValue) * (length - currentIndex)
        }, 0)
        const remainder = sum % 11;
        const calculatedCheckDigit = remainder < 2 ? remainder : 11 - remainder;
        return calculatedCheckDigit === Number(checksumValue)
    }
}
