import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileProduct } from './profile-product';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ProfileProduct', () => {
  let component: ProfileProduct;
  let fixture: ComponentFixture<ProfileProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProduct],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
