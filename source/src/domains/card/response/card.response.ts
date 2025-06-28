import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CardResponse {
    @ApiProperty({
        example:'685fc4f55ad84c5ceb3abbef'
    })
    public id: string
    @ApiProperty({
        example:'0839151204242'
    })
    public cardNumber: string
    @ApiProperty({
        enum: TransitCardType,
    })
    public cardType: TransitCardType
    @ApiProperty()
    public registeredAt: Date
    @ApiProperty({
        enum: CardRegistrationStatus,
    })
    public status: CardRegistrationStatus
}
