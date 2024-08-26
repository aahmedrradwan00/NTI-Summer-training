"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
//DataBase connection
(0, database_1.default)();
// Routes
(0, routes_1.default)(app);
const port = process.env.PORT;
//server
const server = app.listen(port, () => {
    console.log(`App is Listen on port ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    // Server close after all requests are completed
    server.close(() => {
        console.error('shutting the App down');
        process.exit(1);
    });
});
