import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductDialogueComponent } from './product-dialogue/product-dialogue.component';

@Component({
  selector: 'app-product',
  imports:[MatIconModule,MatButtonModule,NgFor,MatTableModule] , 
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
  
  constructor( @Inject(MatDialog) public dialog: MatDialog , ) {

  }
   handleOpenDialog(params?:null){
        const dialogRef = this.dialog.open(ProductDialogueComponent, {
            width:  '500px',  // Default to 400px if not provided
            height: '650px', // Default to auto if not provided
            data: {},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result !== undefined) {
             
            }
          });
        
    }

}
