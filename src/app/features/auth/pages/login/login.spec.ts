import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = { login: vi.fn() };
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.logInForm.get('email')?.value).toBe('');
    expect(component.logInForm.get('password')?.value).toBe('');
    expect(component.loading).toBe(false);
  });

  it('should require email and password', () => {
    const emailControl = component.logInForm.get('email');
    const passwordControl = component.logInForm.get('password');

    expect(emailControl?.valid).toBe(false);
    expect(passwordControl?.valid).toBe(false);
  });

  it('should validate email format', () => {
    const emailControl = component.logInForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false);

    emailControl?.setValue('test@test.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.logins();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call authService.login and navigate to /products on success', () => {
    authService.login.mockReturnValue(of({ access_token: 'token', customer: {} }));

    component.logInForm.setValue({ email: 'test@test.com', password: '123456' });
    component.logins();

    expect(authService.login).toHaveBeenCalledWith({
      useremail: 'test@test.com',
      userpassword: '123456',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
    expect(component.loading).toBe(true);
  });

  it('should handle login error and reset loading', () => {
    authService.login.mockReturnValue(throwError(() => new Error('Login failed')));

    component.logInForm.setValue({ email: 'test@test.com', password: '123456' });
    component.logins();

    expect(authService.login).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  it('should not submit when loading is true', () => {
    component.loading = true;
    component.logInForm.setValue({ email: 'test@test.com', password: '123456' });
    component.logins();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
