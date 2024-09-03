import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TypeDocument} from "../../models/type-document";
import {DataTypeDocumentService} from "../../services/data-type-document.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-type-document',
  templateUrl: './edit-type-document.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./edit-type-document.component.scss']
})
export class EditTypeDocumentComponent implements OnInit {
  id: any;
  type_documents: any;
  type_document = new TypeDocument();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataTypeDocumentService: DataTypeDocumentService,) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getDataTypeDocument();
  }

  getDataTypeDocument() {
    this.dataTypeDocumentService.getDataTypeDocumentByID(this.id).subscribe(res => {
      this.type_documents = res;
      this.type_document = this.type_documents;
    });
  }

  /**
   * Updates an existing TypeDocument in the system.
   *
   * @remarks
   * This method sends a PUT request to the server to update the specified TypeDocument.
   * It uses the `updateDataTypeDocument` method from the `DataTypeDocumentService` to perform the update.
   *
   * @param id - The unique identifier of the TypeDocument to be updated.
   * @param type_document - The updated TypeDocument object containing the new values.
   *
   * @returns An Observable that emits the updated TypeDocument object upon successful completion of the request.
   *
   * @throws Will throw an error if the request fails or if the server returns an error response.
   *
   * @example
   * ```typescript
   * const id = 123;
   * const updatedTypeDocument = new TypeDocument();
   * updatedTypeDocument.name = 'New Type Document Name';
   *
   * this.updateDataTypeDocument(id, updatedTypeDocument).subscribe(res => {
   *   alert("Modification success !!");
   *   console.log(res);
   * });
   * ```
   */
  updateDataTypeDocument() {
    this.dataTypeDocumentService.updateDataTypeDocument(this.id, this.type_document).subscribe(res => {
      Swal.fire({
        title: 'Succès',
        text: 'Les informations du type de document '+this.type_document.Nom+' ont été mises à jour avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/admin/liste-typedocument']);
      console.log(res);
    });
  }

}
