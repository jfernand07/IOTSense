"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSensorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sensor_dto_1 = require("./create-sensor.dto");
class UpdateSensorDto extends (0, mapped_types_1.PartialType)(create_sensor_dto_1.CreateSensorDto) {
}
exports.UpdateSensorDto = UpdateSensorDto;
//# sourceMappingURL=update-sensor.dto.js.map