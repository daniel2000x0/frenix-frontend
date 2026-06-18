import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { enviroment } from '../../environments/enviroment';
import { LoginDto } from '../../dto/login.dto';
import { CreateCustomerDto } from '../../dto/createCustomer.dto';

const mockCustomer = {
  customerid: 1,
  email: 'test@test.com',
  name: 'Test User',
};

const mockLoginResponse = {
  access_token: 'fake-jwt-token',
  customer: mockCustomer,
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should POST, store token and customer in localStorage, and update currentCustomerValue', () => {
      const loginData: LoginDto = {
        useremail: 'test@test.com',
        userpassword: 'password123',
      };

      service.login(loginData).subscribe((res) => {
        expect(res.access_token).toBe('fake-jwt-token');
        expect(res.customer).toEqual(mockCustomer);
      });

      const req = httpMock.expectOne(`${enviroment.api.baseUrl}/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush(mockLoginResponse);

      expect(localStorage.getItem(enviroment.auth.token)).toBe('fake-jwt-token');
      expect(localStorage.getItem('currentCustomer')).toBe(
        JSON.stringify(mockCustomer),
      );
      expect(service.currentCustomerValue).toEqual(mockCustomer);
    });
  });

  describe('register', () => {
    it('should POST register data and return response', () => {
      const registerData: CreateCustomerDto = {
        email: 'test@test.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        birthDate: '2000-01-01',
        genderId: 1,
      };

      service.register(registerData).subscribe((res) => {
        expect(res.message).toBe('User registered successfully');
      });

      const req = httpMock.expectOne(
        `${enviroment.api.baseUrl}/auth/registrar`,
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(registerData);
      req.flush({ message: 'User registered successfully', user: 'test@test.com' });
    });

    it('should throw error on 400 response', () => {
      const registerData: CreateCustomerDto = {
        email: 'test@test.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        birthDate: '2000-01-01',
        genderId: 1,
      };

      service.register(registerData).subscribe({
        error: (err) => {
          expect(err.status).toBe(400);
        },
      });

      const req = httpMock.expectOne(
        `${enviroment.api.baseUrl}/auth/registrar`,
      );
      req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem(enviroment.auth.token, 'some-token');
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false when no token', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear token, customer from localStorage and set currentCustomerValue to null', () => {
      localStorage.setItem(enviroment.auth.token, 'some-token');
      localStorage.setItem('currentCustomer', JSON.stringify(mockCustomer));

      service.logout();

      expect(localStorage.getItem(enviroment.auth.token)).toBeNull();
      expect(localStorage.getItem('currentCustomer')).toBeNull();
      expect(service.currentCustomerValue).toBeNull();
    });
  });

  describe('hasRole', () => {
    it('should return true when roles array is empty', () => {
      expect(service.hasRole([])).toBe(true);
    });

    it('should return false when no token is present', () => {
      expect(service.hasRole(['ADMIN'])).toBe(false);
    });
  });

  describe('getPayload', () => {
    it('should return null when no token', () => {
      expect(service.getPayload()).toBeNull();
    });
  });

  describe('currentCustomerValue', () => {
    it('should return null initially', () => {
      expect(service.currentCustomerValue).toBeNull();
    });

    it('should return customer after login', () => {
      const loginData: LoginDto = {
        useremail: 'test@test.com',
        userpassword: 'password123',
      };

      service.login(loginData).subscribe();
      const req = httpMock.expectOne(`${enviroment.api.baseUrl}/auth/login`);
      req.flush(mockLoginResponse);

      expect(service.currentCustomerValue).toEqual(mockCustomer);
    });
  });
});
