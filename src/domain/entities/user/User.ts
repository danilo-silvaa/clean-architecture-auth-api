import { randomUUID } from 'crypto';
import { IError } from '../../errors/IError';
import { Either, left, right } from '../../shared/Either';
import { Email } from './Email';
import { Name } from './Name';
import { Password } from './Password';

export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    tokenSigningKey: string;
    createdAt: Date;
}

export class User {
    private props: UserProps;

    constructor (props: UserProps) {
        this.props = props;
    }

    static create (props: Omit<UserProps, 'id' | 'tokenSigningKey' | 'createdAt'>): Either<IError, User> {
        const nameOrError = Name.create(props.name);
        if (nameOrError.isLeft()) return left(nameOrError.value);

        const emailOrError = Email.create(props.email);
        if (emailOrError.isLeft()) return left(emailOrError.value);
        
        const passwordOrError = Password.create(props.password);
        if (passwordOrError.isLeft()) return left(passwordOrError.value);

        return right(new User({
            id: randomUUID(),
            name: nameOrError.value,
            email: emailOrError.value,
            password: passwordOrError.value,
            tokenSigningKey: randomUUID(),
            createdAt: new Date()
        }));
    }

    get id () {
        return this.props.id;
    }
    
    get name () {
        return this.props.name;
    }

    get email () {
        return this.props.email;
    }

    set password (passwordHash: string) {
        this.props.password = passwordHash;
    }

    get password () {
        return this.props.password;
    }

    get tokenSigningKey () {
        return this.props.tokenSigningKey;
    }

    set tokenSigningKey (newTokenSigningKey: string) {
        this.props.tokenSigningKey = newTokenSigningKey;
    }

    get createdAt () {
        return this.props.createdAt;
    }
}