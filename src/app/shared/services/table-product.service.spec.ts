import { TestBed } from '@angular/core/testing';

import { TableProductService } from './table-product.service';

describe('TableProductService', () => {
  let service: TableProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
