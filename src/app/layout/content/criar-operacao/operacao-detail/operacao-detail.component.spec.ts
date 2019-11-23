import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoDetailComponent } from './operacao-detail.component';

describe('OperacaoDetailComponent', () => {
  let component: OperacaoDetailComponent;
  let fixture: ComponentFixture<OperacaoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacaoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
