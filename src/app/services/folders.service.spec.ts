import {TestBed} from '@angular/core/testing';
import {FoldersService} from './folders.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('FoldersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FoldersService = TestBed.get(FoldersService);
    expect(service).toBeTruthy();
  });
});

