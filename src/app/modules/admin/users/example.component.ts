import { Component, Inject,  ViewEncapsulation } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    imports:[MatIconModule,MatButtonModule] , 
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor(
        @Inject(MatDialog) public dialog: MatDialog
    )
    {
    }
    handleOpenDialog(params?:null){
        const dialogRef = this.dialog.open(UserDialogComponent, {
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
