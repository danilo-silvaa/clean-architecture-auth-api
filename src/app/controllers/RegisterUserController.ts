import { IRegisterUser } from '../../domain/usecases/RegisterUser/IRegisterUser';
import { HttResponseError, OK } from '../../infra/http/HttpHelper';
import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IController, IControllerResponse } from './IController';

interface RegisterUserRequestBody {
    name: string;
    email: string;
    password: string;
}

export class RegisterUserController implements IController {
    constructor (private registerUser: IRegisterUser) {}

    async handle (request: IHttpRequest): Promise<IControllerResponse> {
        const result = await this.registerUser.execute(request.body as RegisterUserRequestBody);
        if (result.isLeft()) return HttResponseError(result.value);

        return OK({ accessToken: result.value });
    }
}