import { IsBoolean } from 'class-validator'

export class TestCommand {
    @IsBoolean()
    public test: boolean
}
