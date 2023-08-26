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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: {
            status: true
        }
    });
    res.json({
        users
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        res.json({
            msg: "getUser",
            id,
            user
        });
    }
    else {
        res.status(404).json({
            msg: `Does not exist an user by that id`,
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'There is already a user with the email: ' + body.email
            });
        }
        const user = yield user_1.default.create(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const userIdExist = yield user_1.default.findByPk(id);
        if (!userIdExist) {
            return res.status(404).send({
                status: 'error',
                error: 'No user found',
            });
        }
        const user = yield user_1.default.update(body, { where: { id: id } });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // we will use "status" to indicate if the user is active or not:
    try {
        const userIdExist = yield user_1.default.findByPk(id);
        if (!userIdExist) {
            return res.status(404).send({
                status: 'error',
                error: 'No user found',
            });
        }
        yield user_1.default.update({
            status: false
        }, {
            where: {
                id: id
            }
        });
        return res.json();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator.'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map