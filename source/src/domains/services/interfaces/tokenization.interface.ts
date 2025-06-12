import { Jwt } from 'jsonwebtoken'

export interface ITokenizationService {
    createAccessToken(data: object, ttl?: string): string
    createRefreshToken(data: object, ttl?: string): string
    verifyAccessToken(token: string): Jwt
    verifyRefreshToken(token: string): Jwt
    decode(token: string, keyType: 'accessToken' | 'refreshToken'): Jwt
}

export interface IKeySigner {
    sign(data: object, ttl?: string): string
    verify(token: string): Jwt
    decode(token: string): Jwt
}
