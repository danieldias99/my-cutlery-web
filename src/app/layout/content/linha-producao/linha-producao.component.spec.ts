import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaProducaoComponent } from './linha-producao.component';

describe('LinhaProducaoComponent', () => {
  let component: LinhaProducaoComponent;
  let fixture: ComponentFixture<LinhaProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhaProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhaProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
