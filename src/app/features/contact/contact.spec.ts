import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { MessageService } from 'primeng/api';
import { ContactService } from '../../service/contact/contact.service';
import { of, throwError } from 'rxjs';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let messageService: { add: ReturnType<typeof vi.fn> };
  let contactService: { send: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    messageService = { add: vi.fn() };
    contactService = { send: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        { provide: MessageService, useValue: messageService },
        { provide: ContactService, useValue: contactService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty fields and no loading', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    expect(component.loading).toBe(false);
    expect(component.submitted).toBe(false);
  });

  it('should show warning when fields are empty on submit', () => {
    component.onSubmit();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Campos incompletos',
      detail: 'Por favor completa todos los campos.',
    });
    expect(component.submitted).toBe(true);
  });

  it('should send contact message on valid submit and reset form', () => {
    contactService.send.mockReturnValue(of({}));

    component.name = 'Test User';
    component.email = 'test@test.com';
    component.message = 'Hello!';
    component.onSubmit();

    expect(contactService.send).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@test.com',
      message: 'Hello!',
    });
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Mensaje enviado',
      detail: '¡Gracias por contactarnos! Te responderemos pronto.',
    });
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    expect(component.loading).toBe(false);
    expect(component.submitted).toBe(false);
  });

  it('should handle send error and still reset form', () => {
    contactService.send.mockReturnValue(throwError(() => new Error('Send failed')));

    component.name = 'Test User';
    component.email = 'test@test.com';
    component.message = 'Hello!';
    component.onSubmit();

    expect(contactService.send).toHaveBeenCalled();
    expect(component.loading).toBe(false);
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    expect(component.submitted).toBe(false);
  });
});
