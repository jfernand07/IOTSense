import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { RecommendationsService } from '../services/recommendations.service';
import { JwtAuthGuard } from '../../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../module/auth/guards/roles.guard';
import { Roles } from '../../module/auth/decorators/roles.decorator';
import { UserRole } from '../../module/users/entities/user.entity';

@ApiTags('Recomendaciones IA MongoDB')
@ApiBearerAuth()
@Controller('mongodb/recommendations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear una nueva recomendación' })
  @ApiResponse({ status: 201, description: 'Recomendación creada correctamente.' })
  async create(@Body() recommendationData: any) {
    return this.recommendationsService.create(recommendationData);
  }

  @Get('plant/:plantId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener recomendaciones por planta' })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de recomendaciones.' })
  async findByPlant(
    @Param('plantId', ParseIntPipe) plantId: number,
    @Query('status') status?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.recommendationsService.findByPlant(
      plantId,
      status,
      limit ? Number(limit) : 50,
      skip ? Number(skip) : 0,
    );
  }

  @Get('alert/:alertId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener recomendaciones por alerta' })
  @ApiResponse({ status: 200, description: 'Listado de recomendaciones.' })
  async findByAlert(@Param('alertId', ParseIntPipe) alertId: number) {
    return this.recommendationsService.findByAlert(alertId);
  }

  @Get('pending')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener recomendaciones pendientes' })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de recomendaciones pendientes.' })
  async getPending(@Query('plantId') plantId?: number) {
    return this.recommendationsService.getPendingRecommendations(
      plantId ? Number(plantId) : undefined,
    );
  }

  @Get('history')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener historial de recomendaciones' })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Historial de recomendaciones.' })
  async getHistory(
    @Query('plantId') plantId?: number,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.recommendationsService.getHistory(
      plantId ? Number(plantId) : undefined,
      limit ? Number(limit) : 100,
      skip ? Number(skip) : 0,
    );
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Actualizar estado de recomendación' })
  @ApiResponse({ status: 200, description: 'Estado actualizado correctamente.' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; executedByUserId?: number },
  ) {
    return this.recommendationsService.updateStatus(
      id,
      body.status,
      body.executedByUserId,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar recomendación' })
  @ApiResponse({ status: 200, description: 'Recomendación eliminada correctamente.' })
  async delete(@Param('id') id: string) {
    await this.recommendationsService.delete(id);
    return { message: 'Recomendación eliminada correctamente' };
  }
}

