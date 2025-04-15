import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { factureeService } from '../facture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture-dialogue',
  templateUrl: './facture-dialogue.component.html',
  styleUrls: ['./facture-dialogue.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule], // Add FormsModule, ReactiveFormsModule, etc., in your module
})
export class factureDialogueComponent implements OnInit {
  factureForm!: FormGroup;

  // Assuming user list is passed via dialog data
  user: any

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<factureDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , 
    private _userService :UserService , 
    private _factureService : factureeService
  ) {}

  ngOnInit(): void {
    this._userService.user$.subscribe(res => {
      console.log(res);
      this.user = res ;
      this.factureForm = this.fb.group({
        name: [this.data?.facture?.name || '', Validators.required],
        price: [this.data?.facture?.price || 0, [Validators.required, Validators.min(0)]],
        quantity: [this.data?.facture?.quantity || 0, [Validators.required, Validators.min(0)]],
        imageUrl: [this.data?.facture?.imageUrl || ''],
        userId: [ this.user.id, Validators.required],
      });
    })
  

  
  }

  onSubmit(): void {
    console.log(this.factureForm.value);
    
    if (this.factureForm.valid) {
      this._factureService.addfacture(this.factureForm.value).subscribe(res => {
        Swal.fire('Produit ajouté', 'Le produit a été ajouté avec succès.', 'success');

        this.dialogRef.close(this.factureForm.value);
      })
     

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
