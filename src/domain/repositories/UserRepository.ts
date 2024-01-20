import { User } from '../entities/user/User'

export interface UserRepository {
    add (user: User): Promise<void>;
    exists (email: string): Promise<boolean>;
    findById (id: string): Promise<User | null>;
    findByEmail (email: string): Promise<User | null>;
    updatePassword (id: string, newPassword: string): Promise<void>;
    updateTokenSigningKey (id: string, newTokenSigningKey: string): Promise<void>;
}