import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMaquinaDetailComponent } from './tipo-maquina-detail.component';

describe('TipoMaquinaDetailComponent', () => {
  let component: TipoMaquinaDetailComponent;
  let fixture: ComponentFixture<TipoMaquinaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMaquinaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMaquinaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
