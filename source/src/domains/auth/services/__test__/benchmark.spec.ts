import {
    createSigner,
    createVerifier,
} from 'fast-jwt'
import { generateKeyPairSync } from 'crypto'
// Generate test keys
const rsaKeyPair = generateKeyPairSync('rsa', {
    modulusLength: 3072,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

const ed25519KeyPair = generateKeyPairSync('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

const ecKeyPair = generateKeyPairSync('ec', {
    namedCurve: 'prime256v1', // P-256 for ES256
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Create signers and verifiers
const algorithms = {
    'RSA-3072 (RS256)': {
        signer: createSigner({ algorithm: 'RS256', key: rsaKeyPair.privateKey }),
        verifier: createVerifier({ algorithms: ['RS256'], key: rsaKeyPair.publicKey })
    },
    'Ed25519 (EdDSA)': {
        signer: createSigner({ algorithm: 'EdDSA', key: ed25519KeyPair.privateKey }),
        verifier: createVerifier({ cache: true, algorithms: ['EdDSA'], key: ed25519KeyPair.publicKey })
    },
    'ES256 (ECDSA P-256)': {
        signer: createSigner({ algorithm: 'ES256', key: ecKeyPair.privateKey }),
        verifier: createVerifier({ algorithms: ['ES256'], key: ecKeyPair.publicKey })
    }
};

// Benchmark function
async function benchmark() {
    const testPayload = { userId: 123, role: 'user', exp: Math.floor(Date.now() / 1000) + 3600 };
    const iterations = 10000;

    console.log('JWT Performance Benchmark with fast-jwt\n');
    console.log(`Testing ${iterations} operations per algorithm\n`);

    for (const [name, { signer, verifier }] of Object.entries(algorithms)) {
        console.log(`\n=== ${name} ===`);

        // Signing benchmark
        const signStart = process.hrtime.bigint();
        const tokens: string[] = [];

        for (let i = 0; i < iterations; i++) {
            tokens.push(signer(testPayload));
        }

        const signEnd = process.hrtime.bigint();
        const signTime = Number(signEnd - signStart) / 1000000; // Convert to milliseconds
        const signsPerSecond = Math.round((iterations / signTime) * 1000);

        // Verification benchmark
        const verifyStart = process.hrtime.bigint();

        for (const token of tokens) {
            verifier(token);
        }

        const verifyEnd = process.hrtime.bigint();
        const verifyTime = Number(verifyEnd - verifyStart) / 1000000;
        const verificationsPerSecond = Math.round((iterations / verifyTime) * 1000);

        console.log(`Signing: ${signTime.toFixed(2)}ms (${signsPerSecond.toLocaleString()} ops/sec)`);
        console.log(`Verification: ${verifyTime.toFixed(2)}ms (${verificationsPerSecond.toLocaleString()} ops/sec)`);
        console.log(`Verification is ${Math.round(verificationsPerSecond / signsPerSecond)}x faster than signing`);
    }
}

xdescribe('Benchmark', () => {
    it('should pass the test', async () => {
        benchmark().catch(console.error);
    })
})
// Run the benchmark
