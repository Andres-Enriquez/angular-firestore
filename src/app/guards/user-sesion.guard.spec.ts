import { TestBed } from '@angular/core/testing';

import { UserSesionGuard } from './user-sesion.guard';

describe('UserSesionGuard', () => {
  let guard: UserSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
