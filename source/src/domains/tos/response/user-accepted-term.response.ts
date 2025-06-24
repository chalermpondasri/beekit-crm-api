import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'


export class UserAcceptedTermResponse {

    @ApiProperty({
        example: '1.0.0',
    })
    @Expose()
    public accepted: string

    @ApiProperty({
        example: '2.0.0',
    })
    @Expose()
    public required: string

    @ApiProperty({example: false})
    @Expose()
    public isOk: boolean

}
