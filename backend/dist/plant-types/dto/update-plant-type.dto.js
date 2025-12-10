"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_plant_type_dto_1 = require("./create-plant-type.dto");
class UpdatePlantTypeDto extends (0, mapped_types_1.PartialType)(create_plant_type_dto_1.CreatePlantTypeDto) {
}
exports.UpdatePlantTypeDto = UpdatePlantTypeDto;
//# sourceMappingURL=update-plant-type.dto.js.map