import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class AuthenticationResponse {

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5...',
    })
    @Expose()
    public accessToken: string
}
