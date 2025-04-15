import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FactureService } from './facture.service';
import { FactureDialogueComponent } from './facture-dialogue/facture-dialogue.component';

@Component({
  selector: 'app-facture',
  imports:[MatIconModule,MatButtonModule,NgFor,MatTableModule] , 
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class factureComponent {
  
   displayedColumns: string[] = ['name', 'Prix', 'quantity','actions'];
      factures: any[] = [] ;
      constructor( @Inject(MatDialog) public dialog: MatDialog , private factureService:FactureService,
      private cdr: ChangeDetectorRef ) {
    
      }
      ngOnInit(): void {
          this.factureService.getFactures().subscribe(res => {
              this.factures = res as any[] ;
              console.log("this.factures",this.factures);
              this.cdr.detectChanges();
              
          })
      }

   handleOpenDialog(params?:null){
        const dialogRef = this.dialog.open(FactureDialogueComponent, {
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
    /*  this.factureService.deleteUser(id).subscribe(res => {
       this.factures = this.factures.filter(user => user.id !== id);

       
       this.factureService.facturesubscription.next(this.factures);
       this.cdr.detectChanges();
      })
  }*/
    }


    updatefacture(facture: any): void {
      // Afficher un SweetAlert pour le succès de la mise à jour
      Swal.fire({
        title: 'Produit mis à jour',
        text: `Le produit ${facture.name} a été mis à jour avec succès.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Logique de mise à jour, par exemple en ouvrant un formulaire ou en appelant une API
    }
  
    // Supprimer un produit
    deletefacture(id: number): void {
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
          this.factureService.deletefacture(id).subscribe({
            next: () => {
              // Afficher un message de succès
              Swal.fire(
                'Supprimé!',
                'Le produit a été supprimé.',
                'success'
              );
              // Optionnel : Rafraîchir la liste des produits
              this.factures = this.factures.filter(facture => facture.id !== id);
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
