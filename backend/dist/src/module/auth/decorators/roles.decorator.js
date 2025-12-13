"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../guards/roles.guard");
const Roles = (...roles) => (0, common_1.SetMetadata)(roles_guard_1.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map