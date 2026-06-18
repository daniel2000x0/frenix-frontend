import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProduct } from './detail-product';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('DetailProduct', () => {
  let component: DetailProduct;
  let fixture: ComponentFixture<DetailProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProduct],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
