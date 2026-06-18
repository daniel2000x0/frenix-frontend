import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [MessageService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
