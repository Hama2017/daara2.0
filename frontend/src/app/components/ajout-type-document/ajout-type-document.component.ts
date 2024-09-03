import {Component, OnInit} from '@angular/core';
import {DataTypeDocumentService} from "../../services/data-type-document.service";
import {TypeDocument} from "../../models/type-document";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout-type-document',
  templateUrl: './ajout-type-document.component.html',
  styleUrls: ['./ajout-type-document.component.scss']
})
export class AjoutTypeDocumentComponent implements OnInit {
  typedocForm:FormGroup;
  ngOnInit(): void {
    const draft=localStorage.getItem("TYPEDOC_FORM");
    if (draft){
      this.typedocForm.setValue(JSON.parse(draft));
    }
    this.typedocForm.valueChanges.pipe().subscribe(
        value=>{
          localStorage.setItem("TYPEDOC_FORM",JSON.stringify(value))
        }
    );
  }
  constructor(private dataServiceTypeDocument:DataTypeDocumentService,private fb:FormBuilder,private router: Router) {
    this.typedocForm = this.fb.group({
      Nom: ['', Validators.required],
      TypeDoc: ['', Validators.required],
      Statut: ['', Validators.required],
    });
  }
  type_document = new TypeDocument();

  insertDataTypeDocument(){
    this.dataServiceTypeDocument.insertDataTypeDocument(this.type_document).subscribe(res =>{
      // @ts-ignore
      console.log(res)
      Swal.fire({
        title: 'Succès',
        text: 'Le type '+this.type_document.Nom+' a été enregistré avec success.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        this.router.navigate(['/admin/liste-typedocument']);
      }, 1500);
    });
  }
}
