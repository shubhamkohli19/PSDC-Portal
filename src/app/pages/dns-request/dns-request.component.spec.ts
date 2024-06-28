import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsRequestComponent } from './dns-request.component';

describe('DnsRequestComponent', () => {
  let component: DnsRequestComponent;
  let fixture: ComponentFixture<DnsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DnsRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DnsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
