import { TransitCardType } from '@domains/card/models/card-type.enum'
import {
    IsEnum,
    IsNumberString,
    MinLength,
} from 'class-validator'

export class RegisterCardCommand {
    @IsEnum(TransitCardType)
    public cardType: TransitCardType

    @IsNumberString()
    @MinLength(13)
    public cardNumber: string
}
