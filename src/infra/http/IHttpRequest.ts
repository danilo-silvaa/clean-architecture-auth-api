import { User } from '../../domain/entities/user/User';

export interface IHttpRequest {
    params: unknown,
    query: unknown,
    headers: unknown,
    body: unknown,
    user?: User
}