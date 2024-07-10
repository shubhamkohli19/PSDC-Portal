import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNaRequestComponent } from './verify-na-request.component';

describe('VerifyNaRequestComponent', () => {
  let component: VerifyNaRequestComponent;
  let fixture: ComponentFixture<VerifyNaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyNaRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyNaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
