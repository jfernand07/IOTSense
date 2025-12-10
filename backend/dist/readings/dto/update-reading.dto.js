"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReadingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reading_dto_1 = require("./create-reading.dto");
class UpdateReadingDto extends (0, mapped_types_1.PartialType)(create_reading_dto_1.CreateReadingDto) {
}
exports.UpdateReadingDto = UpdateReadingDto;
//# sourceMappingURL=update-reading.dto.js.map