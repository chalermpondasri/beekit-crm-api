import {
    IsCreditCard,
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    IsString,
    Length,
} from 'class-validator'
import { IsValidChecksum } from '@core/decorators/validators/is-valid-checksum.decorator'
import { ApiProperty } from '@nestjs/swagger'


export class RegisterRabbitCardCommand{

    @ApiProperty({
        description: '13 digit RABBIT card number',
        example: '0839151204242'
    })
    @IsNumberString()
    @IsValidChecksum()
    @Length(13, 13)
    public cardNumber: string
}

export class RegisterEmvCardCommand {
    @IsNumberString()
    @Length(16,16)
    public cardNumber: string

    @IsNotEmpty()
    public cardHolderFullName: string

    @IsDateString()
    public expiryDate: Date

    @Length(3,3)
    public cvv: string
}

export type RegisterCardCommandWithOptions =( RegisterRabbitCardCommand | RegisterEmvCardCommand) & {birthDate: Date}
