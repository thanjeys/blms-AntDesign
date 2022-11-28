import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlinkloginComponent } from './enlinklogin.component';

describe('EnlinkloginComponent', () => {
  let component: EnlinkloginComponent;
  let fixture: ComponentFixture<EnlinkloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlinkloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlinkloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
