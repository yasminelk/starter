import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { commandeeService } from '../commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande-dialogue',
  templateUrl: './commande-dialogue.component.html',
  styleUrls: ['./commande-dialogue.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule], // Add FormsModule, ReactiveFormsModule, etc., in your module
})
export class commandeDialogueComponent implements OnInit {
  commandeForm!: FormGroup;

  // Assuming user list is passed via dialog data
  user: any

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<commandeDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , 
    private _userService :UserService , 
    private _commandeService : commandeeService
  ) {}

  ngOnInit(): void {
    this._userService.user$.subscribe(res => {
      console.log(res);
      this.user = res ;
      this.commandeForm = this.fb.group({
        name: [this.data?.commande?.name || '', Validators.required],
        price: [this.data?.commande?.price || 0, [Validators.required, Validators.min(0)]],
        quantity: [this.data?.commande?.quantity || 0, [Validators.required, Validators.min(0)]],
        imageUrl: [this.data?.commande?.imageUrl || ''],
        userId: [ this.user.id, Validators.required],
      });
    })
  

  
  }

  onSubmit(): void {
    console.log(this.commandeForm.value);
    
    if (this.commandeForm.valid) {
      this._commandeService.addcommande(this.commandeForm.value).subscribe(res => {
        Swal.fire('Produit ajouté', 'Le produit a été ajouté avec succès.', 'success');

        this.dialogRef.close(this.commandeForm.value);
      })
     

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
