"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController = __importStar(require("../controllers/users"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
//POST
//if don't exist    --> added
//else              --> message
// Description: return JSON containing all users
router.get("/", UserController.getUsers);
// TODO: validazione tramite express validator
router.post("/", UserController.addUser);
//PUT
//updating of values like name,surname or username
router.put("/", UserController.updateUser);
//DELETE
//deleting of user by username
router.delete("/", UserController.deleteUser);
module.exports = router;
