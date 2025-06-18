import { JwtSignerService } from '@domains/auth/services/signer.service'
import {
    mergeMap,
    of,
} from 'rxjs'

import { generateKeyPairSync } from 'crypto'

describe('SignerService', () => {
    it('should support 2048b RS256 algorithm', async () => {
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        const signer = new JwtSignerService(
            Buffer.from(privateKey).toString('base64'),
            Buffer.from(publicKey).toString('base64'),
            'RS256')

        const start = Date.now()
        of({
            sub: '1234567890',
            name: '<NAME>',
        }).pipe(
            mergeMap(signer.sign),
            mergeMap(signer.verify),
        ).subscribe(result => {
            console.log(Date.now() - start)
            expect(result).not.toBeNull()
        })
    })

    it('should support 4096b RS256 algorithm', () => {
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        const signer = new JwtSignerService(
            Buffer.from(privateKey).toString('base64'),
            Buffer.from(publicKey).toString('base64'),
            'RS256')

        const start = Date.now()
        of({
            sub: '1234567890',
            name: '<NAME>',
        }).pipe(
            mergeMap(signer.sign),
            mergeMap(signer.verify),
        ).subscribe(result => {
            console.log(Date.now() - start)
            expect(result).not.toBeNull()
        })
    })

    it('should support ECDSA algorithm', () => {
        const { privateKey, publicKey } = generateKeyPairSync('ed25519', {
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        const signer = new JwtSignerService(
            Buffer.from(privateKey).toString('base64'),
            Buffer.from(publicKey).toString('base64'),
            'EdDSA')

        const start = Date.now()
        of({
            sub: '1234567890',
            name: '<NAME>',
        }).pipe(
            mergeMap(signer.sign),
            mergeMap(signer.verify),
        ).subscribe(result => {
            console.log(Date.now() - start)
            expect(result).not.toBeNull()
        })
    })
})
