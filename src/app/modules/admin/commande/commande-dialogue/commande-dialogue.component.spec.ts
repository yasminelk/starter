import { ComponentFixture, TestBed } from '@angular/core/testing';

import { commandeDialogueComponent } from './commande-dialogue.component';

describe('commandeDialogueComponent', () => {
  let component: commandeDialogueComponent;
  let fixture: ComponentFixture<commandeDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commandeDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(commandeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
