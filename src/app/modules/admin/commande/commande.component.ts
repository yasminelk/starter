import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

import { commandeeService } from './commande.service';
import { CommandeDialogueComponent } from './commande-dialogue/commande-dialogue.component';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgFor, MatTableModule, MatDialogModule],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class commandeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Prix', 'userId', 'actions'];
  commandes: any[] = [];

  constructor(
    @Inject(MatDialog) public dialog: MatDialog,
    private commandeService: commandeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchCommandes();
  }

  fetchCommandes(): void {
    this.commandeService.getcommandes().subscribe({
      next: (res) => {
        this.commandes = res;
        console.log("commandes chargées :", this.commandes);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur lors du chargement des commandes :", err);
      }
    });
  }

  handleOpenDialog(params: any = null): void {
    const dialogRef = this.dialog.open(CommandeDialogueComponent, {
      width: '500px',
      height: '650px',
      data: params || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogue fermé', result);
      if (result) {
        // Exemple : rafraîchir la liste
        this.fetchCommandes();
      }
    });
  }

  updatecommande(commande: any): void {
    // Exemple : ouvrir le même dialogue en mode édition
    this.handleOpenDialog(commande);
  }

  deletecommande(id: number): void {
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
        this.commandeService.deletecommande(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'La commande a été supprimée.', 'success');
            this.commandes = this.commandes.filter(c => c.id !== id);
            this.cdr.detectChanges();
          },
          error: () => {
            Swal.fire('Erreur!', 'Une erreur est survenue.', 'error');
          }
        });
      }
    });
  }

}
