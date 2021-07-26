import { UserController } from "./controller";
import { UserRepository } from "./repository";
import { UserService } from "./services";

const userRepository = new UserRepository();
const userService = new UserService();
const userController = new UserController(userRepository, userService);

export { userController }