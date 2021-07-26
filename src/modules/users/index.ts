import { UserController } from "./controller";
import { UserRepository } from "./repository";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

export { userController }