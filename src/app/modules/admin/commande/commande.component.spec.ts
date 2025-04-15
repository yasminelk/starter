import { ComponentFixture, TestBed } from '@angular/core/testing';
import { commandeComponent } from './commande.component';


describe('ProductComponent', () => {
  let component: commandeComponent;
  let fixture: ComponentFixture<commandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(commandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
