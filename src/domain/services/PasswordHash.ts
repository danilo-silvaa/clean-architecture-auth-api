export interface PasswordHash {
    hash (plainTextPassword : string): Promise<string>
    compare (plainTextPassword: string, passwordHash: string): Promise<boolean>
}