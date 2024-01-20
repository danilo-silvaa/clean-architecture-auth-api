## API de autenticação e gerenciamento de usuários

Esta API foi desenvolvida para propósitos educacionais, visando a compreensão e aplicação da arquitetura limpa (clean architecture). Uma característica distintiva deste projeto é a implementação da lógica de invalidação de tokens usando chaves únicas para cada usuário. Essa abordagem foi escolhida para otimizar o desempenho, exigindo apenas uma chamada ao banco de dados, eliminando a necessidade de se preocupar com refresh tokens, expiração baseada em tempo e blacklist de tokens.

## Tecnologias Utilizadas

-   Vitest
-   TypeScript
-   Tsx
-   Zod
-   Fastify
-   Bcrypt
-   Dotenv

## Contribuições

Contribuições são bem-vindas! Se você encontrar problemas ou tiver melhorias a sugerir, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Endpoints da API

- [Registrar um novo usuário](#registrar-um-novo-usuário)

- [Autenticar um usuário](#autenticar-um-usuário)

- [Deslogar um usuário](#deslogar-um-usuário)

- [Obter dados do usuário](#obter-dados-do-usuário)

- [Alterar a senha do usuário](#alterar-a-senha-do-usuário)

## Registrar um novo usuário

* **URL**

  `/register`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo   | Tipo do dado   | Descrição                                  | Obrigatório     |
    |------------|----------------|------------------------------------------- |-----------------|
    | name       | string         | Nome do usuário                            | sim             |
    | email      | string         | Endereço de e-mail do usuário              | sim             |
    | password   | string         | Senha do usuário                           | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "accessToken": "ZWZmNTRkMDctZTJmOS00OTdiLTk0OTUtMzc0N2Q4MzBjNDBh.p5ZVSfvDw_2cxHW_bdzAMfxFWrJMNQPblhptLUI43Is"
    }
    ```
    
  **Status Code:** 400
  
    ```json
    {
        "message": "Email address already in use.",
        "type": "EMAIL_EXISTS"
    }
    ``` 
-----

## Autenticar um usuário

* **URL**

  `/login`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo   | Tipo do dado   | Descrição                                  | Obrigatório     |
    |------------|----------------|------------------------------------------- |-----------------|
    | email      | string         | Endereço de e-mail do usuário              | sim             |
    | password   | string         | Senha do usuário                           | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "accessToken": "ZWZmNTRkMDctZTJmOS00OTdiLTk0OTUtMzc0N2Q4MzBjNDBh.p5ZVSfvDw_2cxHW_bdzAMfxFWrJMNQPblhptLUI43Is"
    }
    ```

  **Status Code:** 401
  
    ```json
    {
        "message": "Invalid email or password.",
        "type": "INVALID_EMAIL_OR_PASSWORD"
    }
    ``` 
    
-----

## Deslogar um usuário

* **URL**

  `/logout`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | X-Access-Token  | bearer         | Token de acesso do usuário                 | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```
    User successfully logged out.
    ```
    
  **Status Code:** 401
  
    ```json
    {
        "message": "Invalid access token.",
        "type": "INVALID_ACCESS_TOKEN"
    }
    ``` 
-----

## Obter dados do usuário

* **URL**

  `/user`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | X-Access-Token  | bearer         | Token de acesso do usuário                 | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "name": "Danilo Silva",
        "email": "danilosilva@example.com",
        "createdAt": "2024-01-18T20:23:13.460Z"
    }
    ```
    
  **Status Code:** 401
  
    ```json
    {
        "message": "Invalid access token.",
        "type": "INVALID_ACCESS_TOKEN"
    }
    ``` 
-----

-----

## Deslogar um usuário

* **URL**

  `/logout`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | X-Access-Token  | bearer         | Token de acesso do usuário                 | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```
    User successfully logged out.
    ```
    
  **Status Code:** 401
  
    ```json
    {
        "message": "Invalid access token.",
        "type": "INVALID_ACCESS_TOKEN"
    }
    ``` 
-----

## Alterar a senha do usuário

* **URL**

  `/change-password`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | X-Access-Token  | bearer         | Token de acesso do usuário                 | sim             |
    | currentPassword | string         | Senha atual do usuário                     | sim             |
    | newPassword     | string         | Nova senha do usuário                      | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```
    Password changed successfully.
    ```
    
  **Status Code:** 401
  
    ```json
    {
        "message": "The current password is incorrect.",
        "type": "CURRENT_PASSWORD_INCORRECT"
    }
    ``` 
-----


