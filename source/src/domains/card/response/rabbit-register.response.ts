import { ApiProperty } from '@nestjs/swagger'

export class RabbitRegisterResponse {
    @ApiProperty()
    public success: boolean
}
