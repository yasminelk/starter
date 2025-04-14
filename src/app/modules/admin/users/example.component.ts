import { ChangeDetectorRef, Component, Inject,  OnInit,  ViewEncapsulation } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UsersService } from './users.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    imports:[MatIconModule,MatButtonModule,NgFor,MatTableModule] , 
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit
{
    /**
     * Constructor
     */
    displayedColumns: string[] = ['name', 'email', 'actions'];
    users: any[] = [] ;
    constructor(
        @Inject(MatDialog) public dialog: MatDialog , 
        private userService:UsersService,
        private cdr: ChangeDetectorRef
    )
    {
    }
    ngOnInit(): void {
        this.userService.getUsers().subscribe(res => {
            this.users = res as any[] ;
            this.cdr.detectChanges();
            
        })
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
    deleteUser(id){ 
        this.userService.deleteUser(id).subscribe(res => {
         // delete user from exisiting
         this.users = this.users.filter(user => user.id !== id);

         
         this.userService.userSubscription.next(this.users);
         this.cdr.detectChanges();
        })
    }
}
