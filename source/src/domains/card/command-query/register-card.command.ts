import {
    IsNumberString,
    Length,
    MinLength,
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
}
