import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandeDialogueComponent } from './commande-dialogue.component';



describe('commandeDialogueComponent', () => {
  let component: CommandeDialogueComponent;
  let fixture: ComponentFixture<CommandeDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
