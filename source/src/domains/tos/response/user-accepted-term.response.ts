import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'


export class UserAcceptedTermResponse {

    @ApiProperty({
        example: '1.0.0',
    })
    @Expose()
    public acceptedVersion: string

    @ApiProperty({
        example: '2.0.0',
    })
    @Expose()
    public requiredVersion: string

    @ApiProperty({example: '2021-01-01T00:00:00.000Z'})
    @Expose()
    public acceptedDate: Date

    @ApiProperty({example: false})
    @Expose()
    public isOk: boolean

}
