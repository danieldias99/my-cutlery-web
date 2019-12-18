import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendaDetailComponent } from './encomenda-detail.component';

describe('EncomendaDetailComponent', () => {
  let component: EncomendaDetailComponent;
  let fixture: ComponentFixture<EncomendaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomendaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
