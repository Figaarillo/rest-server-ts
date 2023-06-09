"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./router/user.router"));
const config_1 = __importDefault(require("./config/config"));
class ServerBoostrap extends config_1.default {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnviroment('PORT');
        // middlewares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        // routes
        this.app.use('/api', this.routes());
        // server
        this.listen();
    }
    routes() {
        return [new user_router_1.default().router];
    }
    listen() {
        this.app.listen(this.port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server is listening on http://localhost:${this.port}/`);
        });
    }
}
// eslint-disable-next-line no-new
new ServerBoostrap();
exports.default = ServerBoostrap;
