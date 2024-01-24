import { User } from '../../domain/entities/user/User';

export interface IHttpRequest<T = unknown> {
    params: T,
    query: T,
    body: T,
    headers: T,
    user?: User
}