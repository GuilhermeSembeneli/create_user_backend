import { Router } from 'express';
import { userController } from '../modules/users';


const usersRoutes = Router();


usersRoutes.get('/', (request, response) => {
    userController.findByName(request, response);
})

export { usersRoutes }