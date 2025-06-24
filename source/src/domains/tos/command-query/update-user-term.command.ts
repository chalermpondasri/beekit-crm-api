import { ApiProperty } from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsString,
} from 'class-validator'

export class UpdateUserTermCommand {
    @ApiProperty({example: '1.0.0'})
    @IsNotEmpty()
    @IsString()
    public version: string
}
