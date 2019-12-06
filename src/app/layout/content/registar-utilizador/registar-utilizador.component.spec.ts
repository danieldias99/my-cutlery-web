import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarUtilizadorComponent } from './registar-utilizador.component';

describe('RegistarUtilizadorComponent', () => {
  let component: RegistarUtilizadorComponent;
  let fixture: ComponentFixture<RegistarUtilizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistarUtilizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistarUtilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
