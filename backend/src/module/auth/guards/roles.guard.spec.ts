import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { ROLES_KEY } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(() => {
    reflector = mockReflector as any;
    guard = new RolesGuard(reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow access when no roles are required', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1, role: UserRole.USER },
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;

    mockReflector.getAllAndOverride.mockReturnValue(undefined);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow access when user has required role', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1, role: UserRole.ADMIN },
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;

    mockReflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException when user does not have required role', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1, role: UserRole.USER },
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;

    mockReflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('No tienes permisos para acceder a este recurso');
  });

  it('should throw ForbiddenException when user is not authenticated', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: null,
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;

    mockReflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow('Usuario no autenticado');
  });

  it('should allow access when user has one of multiple required roles', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1, role: UserRole.USER },
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;

    mockReflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN, UserRole.USER]);

    expect(guard.canActivate(context)).toBe(true);
  });
});
