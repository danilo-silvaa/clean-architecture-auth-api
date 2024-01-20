import { User } from '../../../domain/entities/user/User';
import { IError } from '../../../domain/errors/IError';
import { InvalidAccessTokenError } from '../../../domain/errors/user/InvalidAccessTokenError';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { TokenManager } from '../../../domain/services/TokenManager';
import { Either, left, right } from '../../../domain/shared/Either';
import crypto from 'crypto';

export class JwtTokenManager implements TokenManager {
    constructor (private JwtSignatureKey: string, private userRepository: UserRepository) {}

    sign (id: string, uniqueSigningKey: string): string {
        const encodedId = this.base64urlEncode(id);
        const signature = this.createHmacSHA256Signature(encodedId, uniqueSigningKey);
        
        return `${encodedId}.${signature}`;
    }

    async verify (token: string): Promise<Either<IError, User>> {
        const [encodedId, signature] = token.split('.');
        if (!encodedId || !signature) return left(InvalidAccessTokenError);

        const decodedId = this.base64urlDecode(encodedId);

        const userOrNull = await this.userRepository.findById(decodedId);
        if (!userOrNull) return left(InvalidAccessTokenError);

        const calculatedSignature = Buffer.from(this.createHmacSHA256Signature(encodedId, userOrNull.tokenSigningKey), 'base64url');
        const expectedSignature = Buffer.from(signature, 'base64url');

        if (calculatedSignature.length !== expectedSignature.length) return left(InvalidAccessTokenError);

        if (!crypto.timingSafeEqual(calculatedSignature, expectedSignature)) return left(InvalidAccessTokenError);

        return right(userOrNull);
    }

    private createHmacSHA256Signature (data: string, uniqueSigningKey: string) {
        const secret = this.JwtSignatureKey + uniqueSigningKey;

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(data);
        return hmac.digest('base64url');
    }

    private base64urlEncode (data: string) {
        return Buffer.from(data, 'utf8').toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    private base64urlDecode (data: string) {
        return Buffer.from(data, 'base64').toString('utf8');
    }
}