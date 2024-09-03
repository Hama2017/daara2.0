import {Component, OnInit} from '@angular/core';
import {DataTypeDocumentService} from "../../services/data-type-document.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-type-document',
  templateUrl: './liste-type-document.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./liste-type-document.component.scss']
})
export class ListeTypeDocumentComponent implements OnInit {
  ngOnInit(): void {
    this.getTypeDocument();
  }
  type_documents: any;
  constructor(private dataServiceTypeDocument:DataTypeDocumentService) {}
  getTypeDocument() {
    this.dataServiceTypeDocument.getDataTypeDocument().subscribe(res => {
      this.type_documents = res;
      console.log(this.type_documents);
    });
  }
  /**
   * Deletes a data type document by its unique identifier.
   *
   * @param id - The unique identifier of the data type document to be deleted.
   * @returns {void}
   *
   * @remarks
   * This method prompts the user for confirmation before proceeding with the deletion.
   * If the user confirms, it sends a request to the server to delete the specified data type document.
   * After the deletion, it refreshes the list of data type documents by calling the `getTypeDocument` method.
   *
   * @example
   * ```typescript
   * deleteDataTypeDocument(123); // Deletes the data type document with id 123
   * ```
   */
  deleteDataTypeDocument(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment supprimer ce type de document?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataServiceTypeDocument.deleteDataTypeDocument(id).subscribe(res => {
          Swal.fire({
            title: 'Succès',
            text: 'Suppression effectuée avec success !',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.getTypeDocument();
        });
      }
    });
  }
}
