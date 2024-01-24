import { ILoginUser } from '../../domain/usecases/LoginUser/ILoginUser';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IController, IControllerResponse } from './IController';

interface LoginUserRequestBody {
    email: string;
    password: string;
}

export class LoginUserController implements IController {
    constructor (private loginUser: ILoginUser) {}

    async handle (request: IHttpRequest<LoginUserRequestBody>): Promise<IControllerResponse> {
        const result = await this.loginUser.execute(request.body);
        if (result.isLeft()) return HttResponseError(result.value);

        return OK({ accessToken: result.value });
    }
}