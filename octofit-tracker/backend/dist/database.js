"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.disconnectDatabase = exports.connectDatabase = void 0;
var database_1 = require("./config/database");
Object.defineProperty(exports, "connectDatabase", { enumerable: true, get: function () { return database_1.connectDatabase; } });
Object.defineProperty(exports, "disconnectDatabase", { enumerable: true, get: function () { return database_1.disconnectDatabase; } });
Object.defineProperty(exports, "MONGODB_URI", { enumerable: true, get: function () { return database_1.MONGODB_URI; } });
