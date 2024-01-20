import { InvalidAccessTokenError } from '../../domain/errors/user/InvalidAccessTokenError';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IController, IControllerResponse } from './IController';

export class GetUserDataController implements IController {
    async handle (request: IHttpRequest): Promise<IControllerResponse> {
        const user = request.user;
        if (!user) return HttResponseError(InvalidAccessTokenError);

        const sanitizedUserData = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }

        return OK(sanitizedUserData);
    }
}