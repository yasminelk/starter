import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { commandeDialogueComponent } from './commande-dialogue/commande-dialogue.component';
import { commandeeService } from './commande.service';

@Component({
  selector: 'app-commande',
  imports:[MatIconModule,MatButtonModule,NgFor,MatTableModule] , 
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class commandeComponent {
  
   displayedColumns: string[] = ['name', 'Prix', 'quantity','actions'];
      commandes: any[] = [] ;
      constructor( @Inject(MatDialog) public dialog: MatDialog , private commandeService:commandeeService,
      private cdr: ChangeDetectorRef ) {
    
      }
      ngOnInit(): void {
          this.commandeService.getcommandes().subscribe(res => {
              this.commandes = res as any[] ;
              console.log("this.commandes",this.commandes);
              this.cdr.detectChanges();
              
          })
      }

   handleOpenDialog(params?:null){
        const dialogRef = this.dialog.open(commandeDialogueComponent, {
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
    /*  this.commandeService.deleteUser(id).subscribe(res => {
       this.commandes = this.commandes.filter(user => user.id !== id);

       
       this.commandeService.commandesubscription.next(this.commandes);
       this.cdr.detectChanges();
      })
  }*/
    }


    updatecommande(commande: any): void {
      // Afficher un SweetAlert pour le succès de la mise à jour
      Swal.fire({
        title: 'Produit mis à jour',
        text: `Le produit ${commande.name} a été mis à jour avec succès.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Logique de mise à jour, par exemple en ouvrant un formulaire ou en appelant une API
    }
  
    // Supprimer un produit
    deletecommande(id: number): void {
      // Demander confirmation avant suppression
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Cette action est irréversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Appeler la logique de suppression de produit ici
          this.commandeService.deletecommande(id).subscribe({
            next: () => {
              // Afficher un message de succès
              Swal.fire(
                'Supprimé!',
                'Le produit a été supprimé.',
                'success'
              );
              // Optionnel : Rafraîchir la liste des produits
              this.commandes = this.commandes.filter(commande => commande.id !== id);
            },
            error: (err) => {
              // Afficher un message d'erreur en cas de problème
              Swal.fire(
                'Erreur!',
                'Il y a eu un problème lors de la suppression du produit.',
                'error'
              );
            }
          });
        }
      });
    }
  

}
