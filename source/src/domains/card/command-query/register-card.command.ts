import { TransitCardType } from '@domains/card/models/card-type.enum'
import {
    IsEnum,
    IsNumberString,
    Length,
    MinLength,
} from 'class-validator'
import { IsValidChecksum } from '@core/decorators/validators/is-valid-checksum.decorator'


export class RegisterRabbitCardCommand{
    @IsNumberString()
    @IsValidChecksum()
    @MinLength(13)
    public cardNumber: string
}

export class RegisterEmvCardCommand {
    @IsNumberString()
    @Length(16,16)
    public cardNumber: string
}
