import { IUserProps, IUserService } from "../implements/IUserService";

export class UserService {
    validator(validated: 'username' | 'user_id', body: IUserService) {
        let errors = [];
        if (!body[validated]) errors = [...errors, {
            [validated]: 'Campo obrigatorio.'
        }]

        return errors;
    }
    responseValidator(key: string): IUserProps {
        switch (key) {
            case 'duplicated':
                return {
                    status: 406, message: {
                        error: 'Usuario já cadastrado.'
                    }
                }
            case 'notfound':
                return {
                    status: 404, message: {
                        error: 'Usuario não encontrado.'
                    }
                }
            case 'success':
                return {
                    status: 201, message: {
                        message: 'Usuario cadastrado.'
                    }
                }
            case 'updated':
                return {
                    status: 200, message: {
                        message: 'Usuario alterado com sucesso!'
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