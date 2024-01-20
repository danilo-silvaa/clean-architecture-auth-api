import { InvalidAccessTokenError } from '../../domain/errors/user/InvalidAccessTokenError';
import { IChangeUserPassword } from '../../domain/usecases/ChangeUserPassword/IChangeUserPassword';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IController, IControllerResponse } from './IController';

interface ChangeUserPasswordControllerRequestBody {
    currentPassword: string;
    newPassword: string;
}

export class ChangeUserPasswordController implements IController {
    constructor (private changeUserPassword: IChangeUserPassword) {}

    async handle (request: IHttpRequest): Promise<IControllerResponse> {
        const user = request.user;
        if (!user) return HttResponseError(InvalidAccessTokenError);

        const data = {
            ... request.body as ChangeUserPasswordControllerRequestBody,
            user
        }
        
        const result = await this.changeUserPassword.execute(data);
        if (result.isLeft()) return HttResponseError(result.value);

        return OK('Password changed successfully.');
    }
}