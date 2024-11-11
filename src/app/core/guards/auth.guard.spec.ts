import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser$: new BehaviorSubject(null)
    });
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow authenticated user to access route', async () => {
    const mockUser = { id: 1, type: 'customer', name: 'Test User' };
    (authService.currentUser$ as BehaviorSubject<any>).next(mockUser);

    const result = await firstValueFrom(guard.canActivate(
      { data: {} } as any,
      { url: '/test' } as any
    ) as any);

    expect(result).toBe(true);
  });

  it('should redirect unauthenticated user to welcome page', async () => {
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const result = await firstValueFrom(guard.canActivate(
      { data: {} } as any,
      { url: '/protected' } as any
    ) as any);

    expect(router.createUrlTree).toHaveBeenCalledWith(['/auth/welcome']);
    expect(result).toBe(urlTree);
  });

  it('should redirect user without required role', async () => {
    const mockUser = { id: 1, type: 'customer', name: 'Test User' };
    (authService.currentUser$ as BehaviorSubject<any>).next(mockUser);
    const urlTree = new UrlTree();
    router.createUrlTree.and.returnValue(urlTree);

    const result = await firstValueFrom(guard.canActivate(
      { data: { roles: ['worker'] } } as any,
      { url: '/worker-only' } as any
    ) as any);

    expect(router.createUrlTree).toHaveBeenCalledWith(['/']);
    expect(result).toBe(urlTree);
  });
});