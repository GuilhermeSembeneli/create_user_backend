import { Router } from 'express';
import { userController } from '../modules/users';
import { VerifyJWT } from '../modules/users/controller/VerifyJWT';


const usersRoutes = Router();


usersRoutes.get('/user/:id', VerifyJWT, (request, response) => {
    userController.findById(request, response);
})

usersRoutes.get('/username/:name', VerifyJWT, (request, response) => {
    userController.findByName(request, response);
})

usersRoutes.get('/', VerifyJWT, (request, response) => {
    userController.findAll(request, response);
})

usersRoutes.post('/', (request, response) => {
    userController.create(request, response);
})

usersRoutes.post('/login', (request, response) => {
    userController.login(request, response);
})


usersRoutes.put('/', VerifyJWT, (request, response) => {
    userController.update(request, response);
})

usersRoutes.delete('/:user_id', VerifyJWT, (request, response) => {
    userController.delete(request, response);
})

export { usersRoutes }