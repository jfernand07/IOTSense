"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
let AiService = AiService_1 = class AiService {
    configService;
    openai;
    logger = new common_1.Logger(AiService_1.name);
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            this.logger.warn('OPENAI_API_KEY not found in environment variables');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey,
        });
    }
    async detectAnomalies(data) {
        const prompt = `
Eres un motor experto en salud de plantas.
Recibes métricas ambientales y debes:
1. Detectar anomalías
2. Explicar su causa probable
3. Generar recomendaciones
4. Calificar severidad (1–5)

Datos:
- Humedad: ${data.humidity} %
- Temperatura: ${data.temp} °C
- Luz: ${data.lux} lux
- CO₂: ${data.co2} ppm
- Histórico: ${JSON.stringify(data.lastValues)}
- Rango ideal: ${data.idealRanges}

Responde en JSON válido:
{
  "anomalia": true/false,
  "tipo": "",
  "descripcion": "",
  "accion": "",
  "severidad": 1-5
}
`;
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: prompt }],
                response_format: { type: 'json_object' },
            });
            const content = completion.choices[0].message.content;
            if (!content) {
                throw new Error('No content received from OpenAI');
            }
            return JSON.parse(content);
        }
        catch (error) {
            this.logger.error('Error calling OpenAI API', error);
            throw error;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map