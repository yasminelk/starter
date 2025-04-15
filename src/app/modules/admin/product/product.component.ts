import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductDialogueComponent } from './product-dialogue/product-dialogue.component';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  imports:[MatIconModule,MatButtonModule,NgFor,MatTableModule] , 
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  
   displayedColumns: string[] = ['name', 'Prix', 'quantity','actions'];
      products: any[] = [] ;
      constructor( @Inject(MatDialog) public dialog: MatDialog , private productService:ProductService,
      private cdr: ChangeDetectorRef ) {
    
      }
      ngOnInit(): void {
          this.productService.getProducts().subscribe(res => {
              this.products = res as any[] ;
              console.log("this.products",this.products);
              this.cdr.detectChanges();
              
          })
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


  


    updateProduct(product: any): void {
      // Afficher un SweetAlert pour le succès de la mise à jour
      Swal.fire({
        title: 'Produit mis à jour',
        text: `Le produit ${product.name} a été mis à jour avec succès.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Logique de mise à jour, par exemple en ouvrant un formulaire ou en appelant une API
    }
  
    // Supprimer un produit
    deleteProduct(id: number): void {
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
          this.productService.deleteProduct(id).subscribe({
            next: () => {
              // Afficher un message de succès
              Swal.fire(
                'Supprimé!',
                'Le produit a été supprimé.',
                'success'
              );
              // Optionnel : Rafraîchir la liste des produits
              this.products = this.products.filter(product => product.id !== id);
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
