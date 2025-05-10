import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantcareComponent } from './plantcare.component';

describe('PlantcareComponent', () => {
  let component: PlantcareComponent;
  let fixture: ComponentFixture<PlantcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantcareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
