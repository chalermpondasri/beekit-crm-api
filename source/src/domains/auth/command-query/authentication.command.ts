import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthenticationCommand {
    @ApiProperty({
        description: 'Application Id',
        example: '444b9174-995d-4d9d-9ce2-3ced49d640a3',
    })
    @IsNotEmpty()
    public appId: string

    @ApiProperty({
        description: 'mToken',
        example: '6220fc746c284378b750b98faf5a994f',
    })
    @IsNotEmpty()
    public mToken: string
}

