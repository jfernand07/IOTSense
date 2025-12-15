import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { IotService } from './iot.service';

@Controller('api')
export class IotController {
    constructor(private readonly service: IotService) { }

    @Post('sensors')
    updateSensors(@Body() body: any) {
        return this.service.updateSensors(body);
    }

    @Get('sensors/latest')
    getLatestSensors() {
        return this.service.getLatestSensors();
    }

    @Post('camera/register')
    registerCamera(@Body() body: { ip: string; endpoint?: string }) {
        return this.service.registerCamera(body.ip, body.endpoint);
    }

    @Get('camera/stream')
    getCameraStream(@Res() res: Response) {
        const url = this.service.getCameraStreamUrl();
        // Redireccionamos al stream directo de la cámara
        return res.redirect(url);
    }

    @Get('camera/control')
    getCameraControl() {
        return this.service.getCameraControl();
    }

    @Post('camera/control')
    setCameraControl(@Body() body: { streaming: boolean }) {
        return this.service.setCameraControl(body.streaming);
    }

    @Post('led')
    setLedState(@Body() body: { state: boolean }) {
        return this.service.setLedState(body.state);
    }

    @Get('led')
    getLedState() {
        return this.service.getLedState();
    }

    @Get('status')
    getStatus() {
        return this.service.getStatus();
    }
}
