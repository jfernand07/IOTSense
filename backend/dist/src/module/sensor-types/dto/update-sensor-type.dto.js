"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSensorTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sensor_type_dto_1 = require("./create-sensor-type.dto");
class UpdateSensorTypeDto extends (0, mapped_types_1.PartialType)(create_sensor_type_dto_1.CreateSensorTypeDto) {
}
exports.UpdateSensorTypeDto = UpdateSensorTypeDto;
//# sourceMappingURL=update-sensor-type.dto.js.map