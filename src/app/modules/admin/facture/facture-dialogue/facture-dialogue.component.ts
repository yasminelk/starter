import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FactureService } from '../facture.service';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ AJOUTER CECI
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product/product.service';


@Component({
  selector: 'app-facture-dialogue',
  templateUrl: './facture-dialogue.component.html',
  styleUrls: ['./facture-dialogue.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ AJOUTER ICI AUSSI
    // ... autres modules (MatDialogModule, etc.)
  ]
})
export class FactureDialogueComponent implements OnInit {

  factureForm!: FormGroup;
  products: any[] = []; // à remplir via un ProductService si besoin

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FactureDialogueComponent>,
    private factureService: FactureService,    private productService: ProductService,
    
  ) {}

  ngOnInit(): void {
    this.factureForm = this.fb.group({
      name: ['', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      items: this.fb.array([this.createItemGroup()])
    });

    // Exemple de récupération de produits (à adapter)
    this.productService.getProducts().subscribe((res) => (this.products = res));
  }

  get items(): FormArray {
    return this.factureForm.get('items') as FormArray;
  }

  createItemGroup(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  get totalAmount(): number {
    return this.items.controls.reduce((total, group) => {
      const quantity = group.get('quantity')?.value || 0;
      const price = group.get('price')?.value || 0;
      return total + quantity * price;
    }, 0);
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const factureData = {
        ...this.factureForm.value,
        total: this.totalAmount
      };
      this.factureService.createFacture(factureData).subscribe({
        next: (res) => {
          console.log('Facture créée avec succès :', res);
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.error('Erreur lors de la création de la facture', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
