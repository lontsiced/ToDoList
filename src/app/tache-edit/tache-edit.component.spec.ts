import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEditComponent } from './tache-edit.component';

describe('TacheEditComponent', () => {
  let component: TacheEditComponent;
  let fixture: ComponentFixture<TacheEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
