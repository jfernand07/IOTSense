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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { MediaService } from '../services/media.service';
import { JwtAuthGuard } from '../../module/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../module/auth/guards/roles.guard';
import { Roles } from '../../module/auth/decorators/roles.decorator';
import { UserRole } from '../../module/users/entities/user.entity';
import { existsSync, mkdirSync } from 'fs';

const uploadDir = 'uploads';

// Crear directorio si no existe
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@ApiTags('Media MongoDB')
@ApiBearerAuth()
@Controller('mongodb/media')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Crear un nuevo registro de media' })
  @ApiResponse({ status: 201, description: 'Media creado correctamente.' })
  async create(@Body() mediaData: any) {
    return this.mediaService.create(mediaData);
  }

  @Post('upload')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `media-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'video/mp4',
          'video/mpeg',
          'video/quicktime',
          'video/x-msvideo',
        ];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Tipo de archivo no permitido'), false);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir archivo de imagen o video' })
  @ApiResponse({ status: 201, description: 'Archivo subido correctamente.' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { deviceId?: string; plantId?: string; description?: string },
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const mediaData = {
      type: file.mimetype.startsWith('image/') ? 'image' : 'video',
      filename: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      deviceId: body.deviceId ? Number(body.deviceId) : undefined,
      plantId: body.plantId ? Number(body.plantId) : undefined,
      description: body.description,
    };
    return this.mediaService.create(mediaData);
  }

  @Get('device/:deviceId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener media por dispositivo' })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de media.' })
  async findByDevice(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query('type') type?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.mediaService.findByDevice(
      deviceId,
      type,
      limit ? Number(limit) : 50,
      skip ? Number(skip) : 0,
    );
  }

  @Get('plant/:plantId')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener media por planta' })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de media.' })
  async findByPlant(
    @Param('plantId', ParseIntPipe) plantId: number,
    @Query('type') type?: string,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.mediaService.findByPlant(
      plantId,
      type,
      limit ? Number(limit) : 50,
      skip ? Number(skip) : 0,
    );
  }

  @Get('videos')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener videos' })
  @ApiQuery({ name: 'deviceId', required: false, type: Number })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de videos.' })
  async getVideos(
    @Query('deviceId') deviceId?: number,
    @Query('plantId') plantId?: number,
    @Query('limit') limit?: number,
  ) {
    return this.mediaService.getVideos(
      deviceId ? Number(deviceId) : undefined,
      plantId ? Number(plantId) : undefined,
      limit ? Number(limit) : 20,
    );
  }

  @Get('images')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener imágenes' })
  @ApiQuery({ name: 'deviceId', required: false, type: Number })
  @ApiQuery({ name: 'plantId', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listado de imágenes.' })
  async getImages(
    @Query('deviceId') deviceId?: number,
    @Query('plantId') plantId?: number,
    @Query('limit') limit?: number,
  ) {
    return this.mediaService.getImages(
      deviceId ? Number(deviceId) : undefined,
      plantId ? Number(plantId) : undefined,
      limit ? Number(limit) : 50,
    );
  }

  @Get('device/:deviceId/latest')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Obtener el último media de un dispositivo' })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Último media.' })
  async getLatest(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query('type') type?: string,
  ) {
    return this.mediaService.getLatestByDevice(deviceId, type);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar media' })
  @ApiResponse({ status: 200, description: 'Media actualizado correctamente.' })
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.mediaService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar media' })
  @ApiResponse({ status: 200, description: 'Media eliminado correctamente.' })
  async delete(@Param('id') id: string) {
    await this.mediaService.delete(id);
    return { message: 'Media eliminado correctamente' };
  }
}

