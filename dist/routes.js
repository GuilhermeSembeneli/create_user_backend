"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCouse = void 0;
var CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
function createCouse(request, response) {
    CreateCourseService_1.default.execute({
        name: 'Nodejs',
        educator: 'Gui',
        duration: 10
    });
    return response.send();
}
exports.createCouse = createCouse;
