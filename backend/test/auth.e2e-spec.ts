import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AppModule } from '../src/app.module';
import { User, UserRole } from '../src/module/users/entities/user.entity';
import { RefreshToken } from '../src/module/auth/entities/refresh-token.entity';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let refreshTokenRepository: Repository<RefreshToken>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    refreshTokenRepository = moduleFixture.get<Repository<RefreshToken>>(getRepositoryToken(RefreshToken));

    await app.init();
  });

  afterAll(async () => {
    await refreshTokenRepository.delete({});
    await userRepository.delete({});
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe('test@example.com');
        });
    });

    it('should fail with duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User 2',
          email: 'duplicate@example.com',
          password: 'password123',
        })
        .expect(201);

      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User 3',
          email: 'duplicate@example.com',
          password: 'password123',
        })
        .expect(400);
    });

    it('should fail with invalid email format', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123',
        })
        .expect(400);
    });

    it('should fail with short password', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test2@example.com',
          password: '12345',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    beforeAll(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await userRepository.save({
        name: 'Login Test User',
        email: 'login@example.com',
        passwordHash: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      });
    });

    it('should login successfully with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body).toHaveProperty('user');
        });
    });

    it('should fail with invalid email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);
    });

    it('should fail with invalid password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Protected Routes - Unauthorized Access', () => {
    it('should deny access to /users without token', () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });

    it('should deny access to /plants without token', () => {
      return request(app.getHttpServer()).get('/plants').expect(401);
    });

    it('should deny access to /sensors without token', () => {
      return request(app.getHttpServer()).get('/sensors').expect(401);
    });

    it('should deny access to /users with invalid token', () => {
      return request(app.getHttpServer()).get('/users').set('Authorization', 'Bearer invalid-token').expect(401);
    });
  });

  describe('Protected Routes - Role-Based Access', () => {
    let userToken: string;
    let adminToken: string;
    let userRefreshToken: string;
    let adminRefreshToken: string;

    beforeAll(async () => {
      // Create admin user
      const adminHashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = await userRepository.save({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: adminHashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      });

      // Create regular user
      const userHashedPassword = await bcrypt.hash('user123', 10);
      const regularUser = await userRepository.save({
        name: 'Regular User',
        email: 'user@example.com',
        passwordHash: userHashedPassword,
        role: UserRole.USER,
        isActive: true,
      });

      // Login as admin
      const adminResponse = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'admin@example.com',
        password: 'admin123',
      });
      adminToken = adminResponse.body.accessToken;
      adminRefreshToken = adminResponse.body.refreshToken;

      // Login as user
      const userResponse = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'user@example.com',
        password: 'user123',
      });
      userToken = userResponse.body.accessToken;
      userRefreshToken = userResponse.body.refreshToken;
    });

    it('should allow admin to access /users', () => {
      return request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${adminToken}`).expect(200);
    });

    it('should deny user access to /users (admin only)', () => {
      return request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${userToken}`).expect(403);
    });

    it('should allow user to access /plants (GET)', () => {
      return request(app.getHttpServer()).get('/plants').set('Authorization', `Bearer ${userToken}`).expect(200);
    });

    it('should deny user access to /plants (POST)', () => {
      return request(app.getHttpServer())
        .post('/plants')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Plant',
          ownerUserId: 1,
          plantTypeId: 1,
        })
        .expect(403);
    });

    it('should allow admin to create plants', () => {
      return request(app.getHttpServer())
        .post('/plants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Plant',
          ownerUserId: 1,
          plantTypeId: 1,
        })
        .expect(201);
    });

    it('should allow user to access /sensors (GET)', () => {
      return request(app.getHttpServer()).get('/sensors').set('Authorization', `Bearer ${userToken}`).expect(200);
    });

    it('should deny user access to /sensors (POST)', () => {
      return request(app.getHttpServer())
        .post('/sensors')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Sensor',
          externalId: 'test-sensor-1',
          deviceId: 1,
          sensorTypeId: 1,
        })
        .expect(403);
    });

    it('should allow admin to create sensors', () => {
      return request(app.getHttpServer())
        .post('/sensors')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Sensor',
          externalId: 'test-sensor-2',
          deviceId: 1,
          sensorTypeId: 1,
        })
        .expect(201);
    });
  });

  describe('/auth/refresh (POST)', () => {
    let refreshToken: string;
    let accessToken: string;

    beforeAll(async () => {
      const hashedPassword = await bcrypt.hash('refresh123', 10);
      await userRepository.save({
        name: 'Refresh Test User',
        email: 'refresh@example.com',
        passwordHash: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      });

      const response = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'refresh@example.com',
        password: 'refresh123',
      });

      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;
    });

    it('should refresh access token successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body.accessToken).not.toBe(accessToken);
        });
    });

    it('should fail with invalid refresh token', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid-refresh-token' })
        .expect(401);
    });
  });
});

