import { Router } from 'express';
import { userController } from '../modules/users';


const usersRoutes = Router();


usersRoutes.get('/:id', (request, response) => {
    userController.findById(request, response);
})

usersRoutes.get('/', (request, response) => {
    userController.findAll(request, response);
})

usersRoutes.post('/', (request, response) => {
    userController.create(request, response);
})

usersRoutes.put('/', (request, response) => {
    userController.update(request, response);
})

usersRoutes.delete('/:user_id', (request, response) => {
    userController.delete(request, response);
})

export { usersRoutes }