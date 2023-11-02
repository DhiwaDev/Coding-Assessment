import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDescriptionComponent } from './question-description.component';

describe('QuestionDescriptionComponent', () => {
  let component: QuestionDescriptionComponent;
  let fixture: ComponentFixture<QuestionDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
