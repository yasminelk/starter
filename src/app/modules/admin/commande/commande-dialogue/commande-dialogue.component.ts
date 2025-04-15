import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators ,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { ProductService } from '../../product/product.service';
import { UserService } from 'app/core/user/user.service';
import { commandeeService } from '../commande.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-dialogue',
  templateUrl: './commande-dialogue.component.html',
  styleUrls: ['./commande-dialogue.component.scss'],
  imports: [ReactiveFormsModule, CommonModule], // ✅ Ajoute ReactiveFormsModule ici

})
export class CommandeDialogueComponent implements OnInit {
  orderForm!: FormGroup;
  users: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CommandeDialogueComponent>,
    private productService: ProductService,
    private userService: UserService,
    private orderService: commandeeService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      userId: [null, Validators.required],
      items: this.fb.array([])

    });


    this.addItem(); // ajoute une ligne par défaut

    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
   this.productService.getProducts().subscribe((res) => (this.products = res));
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]]
      })
    );
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value).subscribe(() => {
        Swal.fire('Commande créée', 'La commande a été enregistrée avec succès.', 'success');
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
