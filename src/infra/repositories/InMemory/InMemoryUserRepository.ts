import { User } from '../../../domain/entities/user/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];
    
    async add (user: User): Promise<void> {
        this.users.push(user);
    }

    async exists (email: string): Promise<boolean> {
        return this.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    }

    async findById (id: string): Promise<User | null> {
        return this.users.find((user) => user.id === id) || null;
    }

    async findByEmail (email: string): Promise<User | null> {
        return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
    }

    async updatePassword (id: string, newPassword: string): Promise<void> {
        const userIndex = this.users.findIndex((user) => user.id === id);
        
        if (userIndex !== -1) {
            this.users[userIndex].password = newPassword;
        }
    }

    async updateTokenSigningKey (id: string, newTokenSigningKey: string): Promise<void> {
        const userIndex = this.users.findIndex((user) => user.id === id);
        
        if (userIndex !== -1) {
            this.users[userIndex].tokenSigningKey = newTokenSigningKey;
        }
    }
}