import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HasRole } from './has-role';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  template: `<ng-template [appHasRole]="['admin']"><div>Admin Content</div></ng-template>`,
  imports: [HasRole],
  standalone: true,
})
class TestComponent {}

describe('HasRole', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: { hasRole: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authService = { hasRole: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show content when user has required role', () => {
    authService.hasRole.mockReturnValue(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Admin Content');
  });

  it('should hide content when user lacks required role', () => {
    authService.hasRole.mockReturnValue(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Admin Content');
  });
});
