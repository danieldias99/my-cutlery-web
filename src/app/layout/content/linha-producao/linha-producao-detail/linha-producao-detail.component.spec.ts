import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaProducaoDetailComponent } from './linha-producao-detail.component';

describe('LinhaProducaoDetailComponent', () => {
  let component: LinhaProducaoDetailComponent;
  let fixture: ComponentFixture<LinhaProducaoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhaProducaoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhaProducaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
