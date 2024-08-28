import {AfterViewInit, Component} from '@angular/core';
import 'jquery-steps/build/jquery.steps.min.js';
import {DataDepartementService, Departement} from "../../services/data-departement.service";
import {DataDaarasService} from "../../services/data-daaras.service";
import {Daara} from "../../models/daara";
import Swal from "sweetalert2";
import {User} from "../../models/user";
import {DataUserService} from "../../services/data-user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-creation-daara',
  templateUrl: './creation-daara.component.html',
  styleUrls: ['./creation-daara.component.scss']
})
export class CreationDaaraComponent implements AfterViewInit{
  departementsDataResults: Departement[] = [];
  responsableDataResults:User[]=[];
  daara:Daara=new Daara();
  constructor(private departementService: DataDepartementService,
              private daaraService:DataDaarasService,
              private userSevice:DataUserService,
              private router: Router) { }
  ngAfterViewInit(): void {
    this.initializeWizard();
    this.getDepartementdata();
    this.getResponsabledata();
  }
  getDepartementdata(){
    this.departementService.getDepartements().subscribe(res => {
      // @ts-ignore
      this.departementsDataResults.push(...res);
      // @ts-ignore
      let  departementList = document.getElementById('departementList')
      // @ts-ignore
      departementList.innerHTML =`<option value="" disabled selected>Sélectionner le departement</option>`

      this.departementsDataResults.forEach((departementData: Departement) => {
        const id = departementData.id;
        const nomD = departementData.nomDepartement;
        const region = departementData.region.nomRegion;
        //@ts-ignore
        departementList.innerHTML +=`<option value="${id}">${nomD}-${region}</option>`
      });
    }, error => {
      console.log('error ', error);
    });
  }
  getResponsabledata(){
    this.userSevice.getDataUser().subscribe(res => {
      // @ts-ignore
      this.responsableDataResults.push(...res);
      //Ne prend que les users dont le profil est reponsable
      this.responsableDataResults=this.responsableDataResults.filter(res => res.idProfil===3);
      // @ts-ignore
      let  responsableList = document.getElementById('responsableList')
      // @ts-ignore
      responsableList.innerHTML =`<option value="" disabled selected>Sélectionner un responsable</option>`

      this.responsableDataResults.forEach((responsableData: User) => {
        const id = responsableData.id;
        const nomRes = responsableData.nomUser;
        const prenomRes = responsableData.prenomUser;
        //@ts-ignore
        responsableList.innerHTML +=`<option value="${id}">${prenomRes} ${nomRes}</option>`
      });
    }, error => {
      console.log('error ', error);
    });
  }

  private initializeWizard(): void {
    ($('#wizard1') as any).steps({
      headerTag: 'h3',
      bodyTag: 'section',
      transitionEffect: 'slideLeft',
      autoFocus: true,
      labels: {
        current: "current step:",
        pagination: "Pagination",
        finish: "Soumettre",
        next: "Suivant",
        previous: "Précédent",
        loading: "Loading ..."
      },
      // Ajout de la méthode onStepChanging ici
      onStepChanging: (event: any, currentIndex: any, newIndex: any) => {
        switch (currentIndex) {
          case 0:
            this.daara.nomDaara = ($("input[name='nomDaara']").val() as string).toString();
            this.daara.emailDaara= ($("input[name='emailDaara']").val() as string)
            this.daara.adresseDaara = ($("input[name='adresseDaara']").val() as string).toString();
            this.daara.coordonneesDaara = ($("input[name='coordonneesDaara']").val() as string).toString();
            this.daara.dateCreationDaara = ($("input[name='dateCreationDaara']").val() as any);
            this.daara.telephoneDaara = ($("input[name='telephoneDaara']").val() as string).trim().toString();
            this.daara.descriptionDaara = ($("input[name='descriptionDaara']").val() as string).trim().toString();
            this.daara.department_id = ($("select[name='departmentList']").val() as any); // Changement input en select
            break;
          case 1:
            const selectedValue = $("select[name='responsableList']").val();
            this.daara.responsable_id = parseInt(selectedValue as string, 10);
            break;
          case 2:
            break;
          case 4:
            break;
        }
        if (currentIndex < newIndex) {
          return this.validateForm(currentIndex);
        } else {
          return true;
        }
      },
      // Ajout de la méthode onFinished ici
      onFinished: (event: any, currentIndex: any) => {
        console.log('ok');
        console.log(this.daara); // Log du daara pour vérifier les données
        this.daaraService.insertDataDaara(this.daara).subscribe(res => {
          Swal.fire({
            title: 'Succès',
            text: 'Le daara ' + this.daara.nomDaara + ' a été enregistré avec succès.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor:'#17661e'
          });
          this.router.navigate(['/admin/']);
        }, (err) => {
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'enregistrement du daara.',
            icon: 'error',
            showConfirmButton: true,
          });
        });
      }
    });
  }
  validateForm(index: number , otherData:any = {}): boolean {
    let isValid = true;
    const messages = [];

    switch (index) {
      case 0:
        const {nomDaara, adresseDaara, dateCreationDaara, coordonneesDaara, emailDaara, telephoneDaara, } = this.daara;
        if (!nomDaara) messages.push('Le champ "Nom" est obligatoire.');
        if (!adresseDaara) messages.push('Le champ "Adresse" est obligatoire.');
        if (!dateCreationDaara) messages.push('Le champ "Date de creation" est obligatoire.');
        if (!coordonneesDaara) messages.push('Le champ "Coordonnees" est obligatoire.');
        if (!telephoneDaara) messages.push('Le champ "Telephone" est obligatoire.');
        if (coordonneesDaara.length < 18) messages.push('Le champ "Coordoonnees" est invalide.');
        break;
      case 1:
        break;
    }
    // Ajoutez d'autres validations pour les étapes suivantes si nécessaire
    if (messages.length > 0) {
      Swal.fire({
        title: 'Erreur',
        html: messages.join('<br>'),
        icon: 'error',
        confirmButtonColor: '#17661e',
      });
      isValid = false;
    }

    return isValid;
  }
}