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
  imports: [MatIconModule, MatButtonModule, NgFor, MatTableModule],
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class factureComponent {
  displayedColumns: string[] = ['name', 'price', 'actions']; // Définir les colonnes du tableau
  factures: any[] = [];

  constructor(
    @Inject(MatDialog) public dialog: MatDialog,
    private factureService: FactureService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.factureService.getFactures().subscribe((res) => {
      this.factures = res;
      console.log('Factures:', this.factures);
      this.cdr.detectChanges();
    });
  }

  handleOpenDialog(): void {
    const dialogRef = this.dialog.open(FactureDialogueComponent, {
      width: '500px',
      height: '650px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Le dialogue a été fermé');
      if (result !== undefined) {
        // Peut-être ajouter une action ici, comme recharger les factures
      }
    });
  }

  updatefacture(facture: any): void {
    // Afficher un SweetAlert pour le succès de la mise à jour
    Swal.fire({
      title: 'Facture mise à jour',
      text: `La facture ${facture.name} a été mise à jour avec succès.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
    // Logique de mise à jour, par exemple en ouvrant un formulaire ou en appelant une API
  }

  deletefacture(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler la logique de suppression de facture ici
        this.factureService.deletefacture(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'La facture a été supprimée.', 'success');
            this.factures = this.factures.filter((facture) => facture.id !== id);
          },
          error: (err) => {
            Swal.fire(
              'Erreur!',
              'Il y a eu un problème lors de la suppression de la facture.',
              'error'
            );
          },
        });
      }
    });
  }

  downloadPDF(invoiceId: number) {
    this.factureService.downloadInvoicePDF(invoiceId).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture_${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
