import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProduct } from './profile-product';

describe('ProfileProduct', () => {
  let component: ProfileProduct;
  let fixture: ComponentFixture<ProfileProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProduct]
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
