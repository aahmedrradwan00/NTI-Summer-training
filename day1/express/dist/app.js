'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
const mongoose_1 = __importDefault(require('mongoose'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
//DataBase connection
mongoose_1.default
    .connect(process.env.DB)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err));
app.get('/', function (req, res) {
    res.json({ massage: 'hello world' });
});
//server
app.listen(process.env.PORT);
