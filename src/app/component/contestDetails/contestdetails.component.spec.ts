import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestdetailsComponent } from './contestdetails.component';

describe('ContestdetailsComponent', () => {
  let component: ContestdetailsComponent;
  let fixture: ComponentFixture<ContestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
