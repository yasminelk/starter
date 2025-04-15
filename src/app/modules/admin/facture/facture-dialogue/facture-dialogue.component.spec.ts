import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactureDialogueComponent } from './facture-dialogue.component';


describe('factureDialogueComponent', () => {
  let component: FactureDialogueComponent;
  let fixture: ComponentFixture<FactureDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
