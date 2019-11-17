import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaDetailComponent } from './maquina-detail.component';

describe('MaquinaDetailComponent', () => {
  let component: MaquinaDetailComponent;
  let fixture: ComponentFixture<MaquinaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
