import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UnregisterCardCommand {
    @ApiProperty({
        type: 'string',
        example: '377ae7d9-869b-4320-b153-cbcc3188e23f',
    })
    @IsNotEmpty()
    public cardId: string
}
