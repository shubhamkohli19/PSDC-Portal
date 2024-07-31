import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAccessTableComponent } from './network-access-table.component';

describe('NetworkAccessTableComponent', () => {
  let component: NetworkAccessTableComponent;
  let fixture: ComponentFixture<NetworkAccessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkAccessTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkAccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
