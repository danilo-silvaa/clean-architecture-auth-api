import { z } from 'zod';
import { TokenManager } from '../../domain/services/TokenManager';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IMiddleware, IMiddlewareResponse } from './IMiddleware';
import { InvalidAccessTokenError } from '../../domain/errors/user/InvalidAccessTokenError';

const requestSchema = z.object({
    'x-access-token': z.string().trim().min(1),
});

export class AuthenticationUserMiddleware implements IMiddleware {
    constructor (private tokenManager: TokenManager) {}

    async handle (request: IHttpRequest): Promise<IMiddlewareResponse> {
        const requestValidation = requestSchema.safeParse(request.headers);
        if (!requestValidation.success) return HttResponseError(InvalidAccessTokenError);

        const xAccessToken = requestValidation.data['x-access-token'];

        const userOrError = await this.tokenManager.verify(xAccessToken);
        if (userOrError.isLeft()) return HttResponseError(userOrError.value)

        return OK(userOrError.value)
    }
}