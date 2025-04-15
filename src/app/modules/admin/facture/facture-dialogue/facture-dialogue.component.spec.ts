import { ComponentFixture, TestBed } from '@angular/core/testing';

import { factureDialogueComponent } from './facture-dialogue.component';

describe('factureDialogueComponent', () => {
  let component: factureDialogueComponent;
  let fixture: ComponentFixture<factureDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [factureDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(factureDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
