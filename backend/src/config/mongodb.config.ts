import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (config: ConfigService): string => {
  // Si hay una URI completa de MongoDB Atlas, usarla directamente
  const mongoUri = config.get<string>('MONGO_URI');
  if (mongoUri) {
    return mongoUri;
  }

  // Si no, construir la URI desde las variables individuales
  const host = config.get<string>('MONGO_HOST') || 'localhost';
  const port = config.get<string>('MONGO_PORT') || '27017';
  const database = config.get<string>('MONGO_DATABASE') || 'iotsense';
  const username = config.get<string>('MONGO_USERNAME');
  const password = config.get<string>('MONGO_PASSWORD');

  // Si hay username y password, construir URI con autenticación
  if (username && password) {
    // Si el host contiene mongodb.net, es MongoDB Atlas, usar mongodb+srv
    if (host.includes('mongodb.net')) {
      return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${database}?retryWrites=true&w=majority`;
    }
    return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}?authSource=admin`;
  }

  // Sin autenticación
  if (host.includes('mongodb.net')) {
    return `mongodb+srv://${host}/${database}?retryWrites=true&w=majority`;
  }
  return `mongodb://${host}:${port}/${database}`;
};

