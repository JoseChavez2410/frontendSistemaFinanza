import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzaComponent } from './finanza.component';

describe('FinanzaComponent', () => {
  let component: FinanzaComponent;
  let fixture: ComponentFixture<FinanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
