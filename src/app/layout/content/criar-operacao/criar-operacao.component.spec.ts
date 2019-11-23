import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarOperacaoComponent } from './criar-operacao.component';

describe('CriarOperacaoComponent', () => {
  let component: CriarOperacaoComponent;
  let fixture: ComponentFixture<CriarOperacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarOperacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
