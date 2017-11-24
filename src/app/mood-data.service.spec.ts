import { TestBed, inject } from '@angular/core/testing';

import { MoodDataService } from './mood-data.service';

describe('MoodDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodDataService]
    });
  });

  it('should be created', inject([MoodDataService], (service: MoodDataService) => {
    expect(service).toBeTruthy();
  }));
});
