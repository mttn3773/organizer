"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = void 0;
const argon2_1 = require("argon2");
const isValidPassword = (password, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return Promise.reject("Couldnt find a user");
    }
    const isValid = yield argon2_1.verify(user.password, password);
    if (!isValid) {
        return Promise.reject("Wrong Password");
    }
    return Promise.resolve();
});
exports.isValidPassword = isValidPassword;
//# sourceMappingURL=isValidPasswordValidator.js.map