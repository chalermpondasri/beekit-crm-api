import {
    Transform,
} from 'class-transformer'
import { CitizenIdTransformer } from '@utils/citizen-id.transformer'
import { BuddhistDateTransformer } from '@utils/buddhist-date.transformer'
import { ThaiMobilePhoneTransformer } from '@utils/phone-number.transformer'

export class AuthenticatedJwtPayload {
    public sub: string

    @Transform(CitizenIdTransformer)
    public citizenId: string

    public firstName: string

    public middleName: string

    public lastName: string

    @Transform(BuddhistDateTransformer, {toClassOnly: true})
    public dateOfBirth: string

    @Transform(ThaiMobilePhoneTransformer, {toClassOnly: true})
    public mobile: string

    public email: string
}
