import { InvalidAccessTokenError } from '../../domain/errors/user/InvalidAccessTokenError';
import { ILogoutUser } from '../../domain/usecases/LogoutUser/ILogoutUser';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IController, IControllerResponse } from './IController';

export class LogoutUserController implements IController {
    constructor (private logoutUser: ILogoutUser) {}

    async handle (request: IHttpRequest): Promise<IControllerResponse> {
        const user = request.user;
        if (!user) return HttResponseError(InvalidAccessTokenError);
        
        const result = await this.logoutUser.execute(user);
        if (result.isLeft()) return HttResponseError(result.value);

        return OK('User successfully logged out.');
    }
}