import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-dialogue',
  templateUrl: './product-dialogue.component.html',
  styleUrls: ['./product-dialogue.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule], // Add FormsModule, ReactiveFormsModule, etc., in your module
})
export class ProductDialogueComponent implements OnInit {
  productForm!: FormGroup;

  // Assuming user list is passed via dialog data
  user: any

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , 
    private _userService :UserService , 
    private _productService : ProductService
  ) {}

  ngOnInit(): void {
    this._userService.user$.subscribe(res => {
      console.log(res);
      this.user = res ;
      this.productForm = this.fb.group({
        name: [this.data?.product?.name || '', Validators.required],
        price: [this.data?.product?.price || 0, [Validators.required, Validators.min(0)]],
        quantity: [this.data?.product?.quantity || 0, [Validators.required, Validators.min(0)]],
        imageUrl: [this.data?.product?.imageUrl || ''],
        userId: [ this.user.id, Validators.required],
      });
    })
  

  
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    
    if (this.productForm.valid) {
      this._productService.addProduct(this.productForm.value).subscribe(res => {
        this.dialogRef.close(this.productForm.value);
      })
     

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
