import { ComponentFixture, TestBed } from '@angular/core/testing';
import { factureComponent } from './facture.component';


describe('factureComponent', () => {
  let component: factureComponent;
  let fixture: ComponentFixture<factureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [factureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(factureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
