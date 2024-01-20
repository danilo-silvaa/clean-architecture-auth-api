import { IHttpServer } from '../../../infra/http/IHttpServer';
import { makeAuthenticationUserMiddleware } from '../../factories/AuthenticationUserFactory';
import { makeChangeUserPasswordController } from '../../factories/ChangeUserPasswordFactory';
import { makeGetUserDataController } from '../../factories/GetUserDataFactory';
import { makeLoginUserController } from '../../factories/LoginUserFactory';
import { makeLogoutUserController } from '../../factories/LogoutUserFactory';
import { makeRegisterUserController } from '../../factories/RegisterUserFactory';

export function setupRoutes (httpServer: IHttpServer) {
    httpServer.on('POST', '/register', makeRegisterUserController());
    httpServer.on('POST', '/login', makeLoginUserController());
    httpServer.on('GET', '/user', makeGetUserDataController(), makeAuthenticationUserMiddleware());
    httpServer.on('POST', '/change-password', makeChangeUserPasswordController(), makeAuthenticationUserMiddleware());
    httpServer.on('GET', '/logout', makeLogoutUserController(), makeAuthenticationUserMiddleware());

    // httpServer.register(async (httpServer) => {
    //     httpServer.addHook('preHandler', makeAuthenticationMiddleware());

    //     httpServer.on('GET', '/user', makeGetUserDataController());
    // })
}