import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWeaponsComponent } from './dashboard-weapons.component';

describe('DashboardWeaponsComponent', () => {
  let component: DashboardWeaponsComponent;
  let fixture: ComponentFixture<DashboardWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
