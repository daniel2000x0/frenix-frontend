import { TestBed } from '@angular/core/testing';

import { Rolesusuario } from './rolesusuario.service';

describe('Rolesusuario', () => {
  let service: Rolesusuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rolesusuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
