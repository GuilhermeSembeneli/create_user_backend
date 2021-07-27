import { IUserProps, IUserService } from "../implements/IUserService";

export class UserService {
    validator(validated: 'username' | 'user_id' | 'password', body: IUserService) {
        let errors = [];
        if (!body[validated]) errors = [...errors, {
            [validated]: 'Campo obrigatorio.'
        }]

        return errors;
    }
    responseValidator(key: string): IUserProps {
        switch (key) {
            case 'success':
                return {
                    status: 201, message: 'Usuario cadastrado.'
        
                }
            case 'validatedtoken':
                return {
                    status: 201, message: {
                        message: 'Token valido.'
                    }
                }
            case 'updated':
                return {
                    status: 200, message: {
                        message: 'Usuario alterado com sucesso!'
                    }
                }
            case 'duplicated':
                return {
                    status: 406, message: 'Usuario já cadastrado.'
                }
            case 'invaliduser':
                return {
                    status: 400, message: {
                        error: 'Senha ou usúario invalido.'
                    }
                }
            case 'notfound':
                return {
                    status: 404, message: {
                        error: 'Usuario não encontrado.'
                    }
                }
            case 'notoken':
                return {
                    status: 400, message: {
                        error: 'Token expirado.'
                    }
                }
            case 'invalidtoken':
                return {
                    status: 401, message: {
                        error: 'Token invalido.'
                    }
                }
            case 'deleted':
                return {
                    status: 200, message: {
                        message: 'Usuario deletado com sucesso!'
                    }
                }
            default:
                return {
                    status: 500, message: {
                        error: 'Erro interno no servidor'
                    }
                }
        }
    }
}