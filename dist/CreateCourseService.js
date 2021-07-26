"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    CreateCourseService.prototype.execute = function (_a) {
        var name = _a.name, duration = _a.duration, educator = _a.educator;
        console.log(name, duration, educator);
    };
    ;
    return CreateCourseService;
}());
exports.default = new CreateCourseService();
