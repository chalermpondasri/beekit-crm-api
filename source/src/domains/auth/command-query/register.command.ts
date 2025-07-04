import {
    IsBoolean,
    IsEmail,
    IsSemVer,
    IsStrongPassword,
    IsUUID,
} from 'class-validator'

export class RegisterCommand {
    @IsEmail()
    public email: string

    @IsStrongPassword({minNumbers: 1, minLowercase: 1, minUppercase: 1, minLength: 8})
    public password: string

    @IsBoolean()
    public acceptTerm: boolean
    @IsSemVer()
    public termsVersion: string

    @IsUUID()
    public companyId: string
}
