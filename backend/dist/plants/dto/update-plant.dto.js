"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_plant_dto_1 = require("./create-plant.dto");
class UpdatePlantDto extends (0, mapped_types_1.PartialType)(create_plant_dto_1.CreatePlantDto) {
}
exports.UpdatePlantDto = UpdatePlantDto;
//# sourceMappingURL=update-plant.dto.js.map