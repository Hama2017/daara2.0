import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataApprenantService } from 'src/app/services/data-apprenant.service';
import { Apprenant } from 'src/app/models/apprenant';
import Swal from 'sweetalert2';
import 'jquery-steps/build/jquery.steps.min.js';
import { Parent } from "../../models/parent";
import { Tuteur } from "../../models/tuteur";
import { DataParentService } from "../../services/data-parent.service";
import { DataTuteurService } from "../../services/data-tuteur.service";
import { TrParentApprenant } from 'src/app/models/tr-parent-apprenant';
import { DataTrparentapprenantService } from 'src/app/services/data-trparentapprenant.service';
import { TrTuteurApprenant } from 'src/app/models/tr-tuteur-apprenant';
import { DataTrtuteurapprenantService } from 'src/app/services/data-trtuteurapprenant.service';
import { DataTypeDocumentService } from "../../services/data-type-document.service";
import { TypeDocument } from "../../models/type-document";
//import { Document } from "../../models/document";
//import { DataDocumentService } from "../../services/data-document.service";
import { Niveau } from 'src/app/models/niveau';
import { DataNiveauService } from 'src/app/services/data-niveau.service';
import { DataInscriptionService } from "../../services/data-inscription.service";
import { Inscription } from 'src/app/models/inscription';

@Component({
  selector: 'app-creation-apprenant',
  templateUrl: './creation-apprenant.component.html',
  styleUrls: ['./creation-apprenant.component.scss']
})
export class CreationApprenantComponent implements AfterViewInit {
  constructor(private dataServiceEleve: DataApprenantService,
    private dataServiceParent: DataParentService,
    private dataServiceTuteur: DataTuteurService,
    private dataServiceParentEleve: DataTrparentapprenantService,
    private dataServiceTuteurEleve: DataTrtuteurapprenantService,
    private dataServiceTypeDocument: DataTypeDocumentService,
   // private dataServiceDocument: DataDocumentService,
    private dataNiveauClasseService: DataNiveauService,
    private dataInscriptionService: DataInscriptionService,
    ) { }

  eleve: Apprenant = new Apprenant();
  parentPere: Parent = new Parent();
  parentMere: Parent = new Parent();
  tuteur1: Tuteur = new Tuteur();
  tuteur2: Tuteur = new Tuteur();
  trParentEleve1: TrParentApprenant = new TrParentApprenant();
  trParentEleve2: TrParentApprenant = new TrParentApprenant();
  trTuteurEleve1: TrTuteurApprenant = new TrTuteurApprenant();
  trTuteurEleve2: TrTuteurApprenant = new TrTuteurApprenant();
  inscription: Inscription = new Inscription();

  doc: Document = new Document();
  idEl!: number;
  protected readonly console = console;
  typeDocumentDataResults: TypeDocument[] = [];
  documents: Array<{ idTypeDoc: Number, type: string, nom: string, fichier: File }> = [];
  niveauxClasse: Niveau[] = [];
  selectedNiveauClasse: Niveau | undefined;
  ngAfterViewInit(): void {
    this.initializeWizard();
    this.initializeDocumentHandlers();
    this.getTypeDocumentdata();
    this.loadNiveauClasses();


    $(document).ready(function () {


      $("input:checkbox").click(function () {
        var bol = $("input:checkbox:checked").length >= 2;
        // @ts-ignore
        $("input:checkbox").not(":checked").attr("disabled", bol);

        if ($("#autresCheckbox").is(":checked")) {
          $("#tuteurFormsContainer").show();
          if ($("input:checkbox:checked").length == 1 && $("#autresCheckbox").is(":checked")) {
            $("#tuteurForm2").show();
          } else {
            $("#tuteurForm2").hide();
          }
        } else {
          $("#tuteurFormsContainer").hide();
          $("#tuteurForm2").hide();
        }
      });
    });

  }

  private loadNiveauClasses(): void {
    this.dataNiveauClasseService.getNiveaux().subscribe(data => {
      this.niveauxClasse = data;
      this.updateNiveauClasseSelect(data);
    });
  }

  private updateNiveauClasseSelect(data: Niveau[]): void {
    const select = $('#NiveauClasseEleve');
    select.empty();
    select.append('<option value="" disabled selected>Selectionner un niveau de classe</option>');

    data.forEach(niveau => {
      select.append(`<option value="${niveau.id}">${niveau.nomNiveau}</option>`);
    });
  }

  private fillRecapSection(): void {
    $('#recapPrenom').text(`Prénom: ${this.eleve.prenomApprenant}`);
    $('#recapNom').text(`Nom: ${this.eleve.nomApprenant}`);
    $('#recapDateNaiss').text(`Date de naissance: ${this.eleve.dateNaissApprenant}`);
    $('#recapLieuNaiss').text(`Lieu de naissance: ${this.eleve.lieuNaissApprenant}`);
    $('#recapSexe').text(`Sexe: ${this.eleve.sexeApprenant}`);

    const niveauClasse = this.niveauxClasse.find(niveau => niveau.id === parseInt($("select[name='NiveauClasseEleve']").val() as string));
    this.selectedNiveauClasse = niveauClasse;
    $('#recapNiveauClasse').text(`Niveau de classe: ${niveauClasse?.nomNiveau}`);

    $('#recapPrenomPere').text(`Prénom Père: ${this.parentPere.Prenom}`);
    $('#recapNomPere').text(`Nom Père: ${this.parentPere.Nom}`);
    $('#recapTelephonePere').text(`Téléphone Père: ${this.parentPere.NumeroTelephone}`);
    $('#recapEmailPere').text(`Email Père: ${this.parentPere.Email}`);
    $('#recapAdressePere').text(`Adresse Père: ${this.parentPere.Adresse}`);

    $('#recapPrenomMere').text(`Prénom Mère: ${this.parentMere.Prenom}`);
    $('#recapNomMere').text(`Nom Mère: ${this.parentMere.Nom}`);
    $('#recapTelephoneMere').text(`Téléphone Mère: ${this.parentMere.NumeroTelephone}`);
    $('#recapEmailMere').text(`Email Mère: ${this.parentMere.Email}`);
    $('#recapAdresseMere').text(`Adresse Mère: ${this.parentMere.Adresse}`);

    let tuteursHtml = '';

    if ($("#pereCheckbox").is(":checked")) {
      tuteursHtml += `<p><strong>Père</strong><br>Prénom: ${this.parentPere.Prenom}<br>Nom: ${this.parentPere.Nom}<br>Téléphone: ${this.parentPere.NumeroTelephone}<br>Email: ${this.parentPere.Email}<br>Adresse: ${this.parentPere.Adresse}</p>`;
    }

    if ($("#mereCheckbox").is(":checked")) {
      tuteursHtml += `<p><strong>Mère</strong><br>Prénom: ${this.parentMere.Prenom}<br>Nom: ${this.parentMere.Nom}<br>Téléphone: ${this.parentMere.NumeroTelephone}<br>Email: ${this.parentMere.Email}<br>Adresse: ${this.parentMere.Adresse}</p>`;
    }

    if ($("#autresCheckbox").is(":checked")) {
      tuteursHtml += `<p><strong>Autre Tuteur 1</strong><br>Prénom: ${this.tuteur1.Prenom}<br>Nom: ${this.tuteur1.Nom}<br>Sexe: ${this.tuteur1.Sexe}<br>Téléphone: ${this.tuteur1.NumeroTelephone}<br>Email: ${this.tuteur1.Email}<br>Adresse: ${this.tuteur1.Adresse}</p>`;

      if (this.tuteur2.Prenom) {
        tuteursHtml += `<p><strong>Autre Tuteur 2</strong><br>Prénom: ${this.tuteur2.Prenom}<br>Nom: ${this.tuteur2.Nom}<br>Sexe: ${this.tuteur2.Sexe}<br>Téléphone: ${this.tuteur2.NumeroTelephone}<br>Email: ${this.tuteur2.Email}<br>Adresse: ${this.tuteur2.Adresse}</p>`;
      }
    }

    $('#recapTuteurs').html(tuteursHtml);

    // let fScolariteHtml = '';

    // fScolariteHtml = `<p><strong>Frais d'inscription: ${niveauClasse?.droitInscriptionNiveau} F CFA</strong></p>`;
    // fScolariteHtml += `<p><strong>Mensualite: ${niveauClasse?.mensualiteNiveau} F CFA / Mois</strong></p>`;
    // // @ts-ignore
    // let totalTout: any = (niveauClasse?.Mensualite * 12) + totalServices;
    // fScolariteHtml += `<p><strong>Total: ${totalTout} F CFA</strong></p>`;


    //$('#recapFscolarite').html(fScolariteHtml);


    let documentsHtml = '';
    this.documents.forEach(doc => {
      documentsHtml += `<p>${doc.type} </p>`;
    });
    $('#recapDocuments').html(documentsHtml);
  }


  /**
   * Initialise le wizard avec les étapes nécessaires et des gestionnaires d'événements.
   *
   * @remarks
   * Cette fonction configure le wizard en utilisant le plugin jQuery Steps.
   * Elle initialise également les gestionnaires d'événements pour chaque étape, tels que la validation du formulaire et l'insertion des données.
   */
  private initializeWizard(): void {
    // @ts-ignore
    // @ts-ignore
    ($('#wizard1') as any).steps({
      headerTag: 'h3',
      bodyTag: 'section',
      transitionEffect: 'slideLeft',
      autoFocus: true,
      labels: {
        current: "current step:",
        pagination: "Pagination",
        finish: "Terminer",
        next: "Suivant",
        previous: "Précédent",
        loading: "Loading ..."
      },
      // @ts-ignore
      onStepChanging: (event: any, currentIndex: any, newIndex: any) => {

        this.initializeDocumentHandlers();

        switch (currentIndex) {
          case 0:
            this.eleve.matriculeApprenant= "test12";
            this.eleve.prenomApprenant = ($("input[name='Prenom']").val() as any).toString();
            this.eleve.nomApprenant = ($("input[name='Nom']").val() as any).toString();
            this.eleve.dateNaissApprenant = ($("input[name='DateNaiss']").val() as any);
            this.eleve.lieuNaissApprenant = ($("input[name='LieuNaiss']").val() as any).toString();
            this.eleve.sexeApprenant = ($("select[name='Sexe']").val() as any);
           break;
          case 1:
            this.parentPere.Prenom = ($("input[name='PrenomPere']").val() as any).toString();
            this.parentPere.Nom = ($("input[name='NomPere']").val() as any).toString();
            this.parentPere.NumeroTelephone = ($("input[name='TelephonePere']").val() as any).trim().toString();
            this.parentPere.Email = ($("input[name='EmailPere']").val() as any).toString();
            this.parentPere.Adresse = ($("input[name='AdressePere']").val() as any).toString();
            this.parentPere.Sexe = 'Masculin';

            this.parentMere.Prenom = ($("input[name='PrenomMere']").val() as any).toString();
            this.parentMere.Nom = ($("input[name='NomMere']").val() as any).toString();
            this.parentMere.NumeroTelephone = ($("input[name='TelephoneMere']").val() as any).trim().toString();
            this.parentMere.Email = ($("input[name='EmailMere']").val() as any).toString();
            this.parentMere.Adresse = ($("input[name='AdresseMere']").val() as any).toString();
            this.parentMere.Sexe = 'Femminin';
            break;
          case 2:
            var statusValidation: string;

            statusValidation = "";
            var checkedCount = $("input:checkbox:checked").length;
            var bol2 = checkedCount >= 2;
            // @ts-ignore
            $("input:checkbox").not(":checked").attr("disabled", bol2);

            var isPereChecked = $("#pereCheckbox").is(":checked");
            var isMereChecked = $("#mereCheckbox").is(":checked");
            var isAutresChecked = $("#autresCheckbox").is(":checked");

            if (isPereChecked && isMereChecked) {
              this.tuteur1 = this.mapParentToTuteur(this.parentPere);
              this.tuteur2 = this.mapParentToTuteur(this.parentMere);
              statusValidation = "PM";
            } else if (isPereChecked) {
              this.tuteur1 = this.mapParentToTuteur(this.parentPere);
              statusValidation = "P";
            } else if (isMereChecked) {
              this.tuteur1 = this.mapParentToTuteur(this.parentMere);
              statusValidation = "M";
            } else if (isAutresChecked && checkedCount == 1) {
              this.tuteur1.Prenom = ($("input[name='PrenomTuteur']") as any).val().toString();
              this.tuteur1.Nom = ($("input[name='NomTuteur']").val() as any).toString();
              this.tuteur1.Sexe = ($("select[name='SexeTuteur']").val() as any).toString();
              this.tuteur1.NumeroTelephone = ($("input[name='TelephoneTuteur']") as any).val().toString();
              this.tuteur1.Adresse = ($("input[name='AdresseTuteur']") as any).val().toString();
              this.tuteur1.Email = ($("input[name='EmailTuteur']") as any).val().toString();

              this.tuteur2.Prenom = ($("input[name='PrenomTuteur2']") as any).val().toString();
              this.tuteur2.Nom = ($("input[name='NomTuteur2']") as any).val().toString();
              this.tuteur2.Sexe = ($("select[name='SexeTuteur2']") as any).val().toString();
              this.tuteur2.NumeroTelephone = ($("input[name='TelephoneTuteur2']") as any).val().toString();
              this.tuteur2.Adresse = ($("input[name='AdresseTuteur2']") as any).val().toString();
              this.tuteur2.Email = ($("input[name='EmailTuteur2']") as any).val().toString();

              statusValidation = "TT";

            }

            if (isAutresChecked && checkedCount == 2) {
              this.tuteur1.Prenom = ($("input[name='PrenomTuteur']") as any).val().toString();
              this.tuteur1.Nom = ($("input[name='NomTuteur']") as any).val().toString();
              this.tuteur1.Sexe = ($("select[name='SexeTuteur']") as any).val().toString();
              this.tuteur1.NumeroTelephone = ($("input[name='TelephoneTuteur']") as any).val().toString();
              this.tuteur1.Adresse = ($("input[name='AdresseTuteur']") as any).val().toString();
              this.tuteur1.Email = ($("input[name='EmailTuteur']") as any).val().toString();

              if (isMereChecked) {
                this.tuteur2 = this.mapParentToTuteur(this.parentMere);
                statusValidation = "MT";
              } else if (isPereChecked) {
                this.tuteur2 = this.mapParentToTuteur(this.parentPere);
                statusValidation = "PT";
              }

            }

            break;

          case 3:

            this.fillRecapSection();

            break;

        }

        if (currentIndex < newIndex) {
          // @ts-ignore
          return this.validateForm(currentIndex, { statusValidation: statusValidation, checkedCount: checkedCount });
        } else {
          return true;
        }

      },
      onFinishing: (event: any, currentIndex: number) => {
        return true;//this.validateForm(currentIndex); // Valide la dernière section avant de terminer
      },
      onFinished: (event: any, currentIndex: any) => {

        (async () => {
          try {
            const res2 = await this.insertDataEleve(this.eleve);
            //this.insertAllDocument();

            this.inscription.apprenant_id = this.eleve.id;
            // @ts-ignore
           // this.inscription.annee_scolaire_id = this.selectedAnneeScolaire.id;
            // @ts-ignore
            this.inscription.mensualite = 0;
            // @ts-ignore
            this.inscription.droitInscription = 0;
            // @ts-ignore
            this.inscription.tdNiveau_id = this.selectedNiveauClasse?.id;
            this.inscription.daara_id = 1;
            let currentDate = new Date();
            let year = currentDate.getFullYear().toString().slice(-2); // Récupère les 2 derniers chiffres de l'année
            let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Mois avec zéro devant si < 10
            let day = ('0' + currentDate.getDate()).slice(-2); // Jour avec zéro devant si < 10

            let compteur = ('0' + 1).slice(-2); // Un compteur ou référence sur 2 chiffres (ici, 01 pour commencer)

            this.inscription.dateInscription = `${year}${month}${day}`;
            this.inscription.numeroInscription = `${year}${month}${day}${compteur}`;

            let formattedDate = new Date().toISOString().slice(0, 10);
            this.inscription.dateInscription = formattedDate.toString();
            this.console.log(this.inscription);
            const res3 = await this.insertDataInscription(this.inscription);

          } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'élève:', error);
          }
        })();
        this.insertDataParent(this.parentPere, this.trParentEleve1);
        this.insertDataParent(this.parentMere, this.trParentEleve2);
        this.insertDataTuteur(this.tuteur1, this.trTuteurEleve1);
        if (this.tuteur2.Prenom) {
          this.insertDataTuteur(this.tuteur2, this.trTuteurEleve2);
        }



      }
    });

  }

  /**
   * Valide les données du formulaire pour l'étape d'index donné.
   *
   * @param index - L'index de l'étape du formulaire à valider.
   * @param otherData - Données supplémentaires nécessaires pour la validation.
   * @returns {boolean} - Vrai si les données du formulaire sont valides pour l'étape donnée, sinon faux.
   */
  validateForm(index: number, otherData: any = {}): boolean {
    let isValid = true;
    const messages = [];

    switch (index) {
      case 0:
        const { prenomApprenant, nomApprenant, dateNaissApprenant, lieuNaissApprenant, sexeApprenant } = this.eleve;
        if (!prenomApprenant) messages.push('Le champ "Prénom" est obligatoire.');
        if (!nomApprenant) messages.push('Le champ "Nom" est obligatoire.');
        if (!dateNaissApprenant) messages.push('Le champ "Date de naissance" est obligatoire.');
        if (!lieuNaissApprenant) messages.push('Le champ "Lieu de naissance" est obligatoire.');
        if (!sexeApprenant) messages.push('Le champ "Sexe" est obligatoire.');
        break;
      case 1:
        const { Prenom: PrenomPere, Nom: NomPere, NumeroTelephone: NumeroTelephonePere, Email: EmailPere, Adresse: AdressePere, Sexe: SexePere } = this.parentPere;
        const { Prenom: PrenomMere, Nom: NomMere, NumeroTelephone: NumeroTelephoneMere, Email: EmailMere, Adresse: AdresseMere, Sexe: SexeMere } = this.parentMere;

        if (!PrenomPere) messages.push('Le champ "Prénom du Père" est obligatoire.');
        if (!NomPere) messages.push('Le champ "Nom du Père" est obligatoire.');
        // if (!NumeroTelephonePere) messages.push('Le champ "Téléphone du Père" est obligatoire.');
        if (NumeroTelephonePere && NumeroTelephonePere.length != 9) messages.push('Le champ "Téléphone du Père" est invalide.');
        // if (!EmailPere) messages.push('Le champ "Email du Père" est obligatoire.');
        // if (!AdressePere) messages.push('Le champ "Adresse du Père" est obligatoire.');

        if (!PrenomMere) messages.push('Le champ "Prénom de la Mère" est obligatoire.');
        if (!NomMere) messages.push('Le champ "Nom de la Mère" est obligatoire.');
        // if (!NumeroTelephoneMere) messages.push('Le champ "Téléphone de la Mère" est obligatoire.');
        if (NumeroTelephoneMere && NumeroTelephoneMere.length != 9) messages.push('Le champ "Téléphone de la Mère" est invalide.');
        // if (!EmailMere) messages.push('Le champ "Email de la Mère" est obligatoire.');
        // if (!AdresseMere) messages.push('Le champ "Adresse de la Mère" est obligatoire.');
        break;
      case 2:

        const { Prenom: PrenomTuteur1, Nom: NomTuteur1, NumeroTelephone: NumeroTelephoneTuteur1, Email: EmailTuteur1, Adresse: AdresseTuteur1, Sexe: SexeTuteur1 } = this.tuteur1;
        const { Prenom: PrenomTuteur2, Nom: NomTuteur2, NumeroTelephone: NumeroTelephoneTuteur2, Email: EmailTuteur2, Adresse: AdresseTuteur2, Sexe: SexeTuteur2 } = this.tuteur2;
        if (otherData.checkedCount == 0 || otherData.checkedCount > 2) messages.push('Veuillez choisir au moins un Tuteur.');

        if (otherData.statusValidation == "PT" || otherData.statusValidation == "MT" || otherData.statusValidation == "TT") {
          if (!PrenomTuteur1) messages.push('Le champ "Prénom Tuteur" est obligatoire.');
          if (!NomTuteur1) messages.push('Le champ "Nom Tuteur" est obligatoire.');
          if (!SexeTuteur1) messages.push('Le champ "Sexe Tuteur" est obligatoire.');
          if (!NumeroTelephoneTuteur1) messages.push('Le champ "Téléphone Tuteur" est obligatoire.');
          if (NumeroTelephoneTuteur1 && NumeroTelephoneTuteur1.length != 9) messages.push('Le champ "Téléphone" est invalide.');

          if (otherData.statusValidation == "TT" && PrenomTuteur2) {
            if (!PrenomTuteur2) messages.push('Le champ "Prénom Tuteur 2" est obligatoire.');
            if (!NomTuteur2) messages.push('Le champ "Nom Tuteur 2" est obligatoire.');
            if (!SexeTuteur2) messages.push('Le champ "Sexe Tuteur 2" est obligatoire.');
            if (!NumeroTelephoneTuteur2) messages.push('Le champ "Téléphone Tuteur 2" est obligatoire.');
            if (NumeroTelephoneTuteur2 && NumeroTelephoneTuteur2.length != 9) messages.push('Le champ "Téléphone Tuteur 2" est invalide.');

          }
        }
        if (otherData.statusValidation == "P" || otherData.statusValidation == "M") {
          if (!NumeroTelephoneTuteur1) messages.push('Le champ "Téléphone pour le parent Tuteur" est obligatoire.');
          if (NumeroTelephoneTuteur1 && NumeroTelephoneTuteur1.length != 9) messages.push('Le champ "Téléphone pour le parent Tuteur" est invalide.');
        }

        if (otherData.statusValidation == "PM") {
          if (!NumeroTelephoneTuteur1) messages.push('Le champ "Téléphone pour le parent Tuteur Pere" est obligatoire.');
          if (!NumeroTelephoneTuteur2) messages.push('Le champ "Téléphone pour le parent Tuteur Mere" est obligatoire.');
          if (NumeroTelephoneTuteur1 && NumeroTelephoneTuteur1.length != 9) messages.push('Le champ "Téléphone pour le parent Tuteur Pere" est invalide.');
          if (NumeroTelephoneTuteur2 && NumeroTelephoneTuteur2.length != 9) messages.push('Le champ "Téléphone pour le parent Tuteur Mere" est invalide.');
        }

        if (otherData.statusValidation == "MT") {
          if (!NumeroTelephoneTuteur2) messages.push('Le champ "Téléphone pour le parent Tuteur Mere" est obligatoire.');
          if (NumeroTelephoneTuteur2 && NumeroTelephoneTuteur2.length != 9) messages.push('Le champ "Téléphone pour le parent Tuteur Mere" est invalide.');

        }

        if (otherData.statusValidation == "PT") {
          if (!NumeroTelephoneTuteur2) messages.push('Le champ "Téléphone pour le parent Tuteur Pere" est obligatoire.');
          if (NumeroTelephoneTuteur2 && NumeroTelephoneTuteur2.length != 9) messages.push('Le champ "Téléphone pour le parent Tuteur Pere" est invalide.');

        }


    }


    // Ajoutez d'autres validations pour les étapes suivantes si nécessaire
    if (messages.length > 0) {
      Swal.fire({
        title: 'Erreur',
        html: messages.join('<br>'),
        icon: 'error',
        confirmButtonColor: '#2f1514',
      });
      isValid = false;
    }

    return isValid;
  }
  /**
   * Insère un nouvel enregistrement Eleve dans la base de données.
   *
   * @param eleve - L'objet Eleve à insérer.
   * @returns Une promesse qui se résout avec l'objet Eleve inséré ou rejette avec une erreur.
   *
   * @remarks
   * Cette fonction utilise le `dataServiceEleve` pour insérer l'objet `eleve` fourni dans la base de données.
   * Elle retourne une promesse qui se résout avec l'objet Eleve inséré ou rejette avec une erreur.
   * L'ID de l'objet Eleve inséré est stocké dans les propriétés `eleve` et `idEl` de l'instance de la classe.
   *
   * */
  async insertDataEleve(eleve: Apprenant): Promise<Apprenant> {
    return new Promise((resolve, reject) => {
      this.dataServiceEleve.insertDataApprenant(eleve).subscribe(
        (res) => {
          let res2: Apprenant = res as Apprenant;
          this.eleve.id = res2.id;
          this.idEl = res2.id;
          resolve(res2);
        },
        (error) => {
          console.log('error', error);
          reject(error);
        }
      );
    });
  }
  insertDataParent(parent: Parent, trParentEleve: TrParentApprenant) {
    this.dataServiceParent.insertDataParent(parent).subscribe(res => {
      let res2: Parent = res as Parent;
      parent.id = res2.id;
      trParentEleve.parent_id = parent.id;
      trParentEleve.apprenant_id = this.eleve.id;
      this.insertDataTrParentEleve(trParentEleve)
      return res;
    }, error => {
      console.log('error ', parent);
    });
  }
  insertDataTrParentEleve(trParentEleve: TrParentApprenant) {
    this.dataServiceParentEleve.insertDataTrParentApprenant(trParentEleve).subscribe(res => {
      return res;
    }, error => {
      console.log('error ', parent);
    });
  }
  insertDataTrTuteurEleve(trParentTuteur: TrTuteurApprenant) {
    this.dataServiceTuteurEleve.insertDataTrTuteurApprenant(trParentTuteur).subscribe(res => {
      return res;
    }, error => {
      console.log('error ', parent);
    });
  }
  insertDataTuteur(tuteur: Tuteur, trParentTuteur: TrTuteurApprenant) {
    this.dataServiceTuteur.insertDataTuteur(tuteur).subscribe(res => {
      let res2: Parent = res as Parent;
      tuteur.id = res2.id;
      trParentTuteur.tuteur_id = tuteur.id;
      trParentTuteur.apprenant_id = this.eleve.id;
      this.insertDataTrTuteurEleve(trParentTuteur)
      return res;
    }, error => {
      console.log('error ', tuteur);
    });
  }
 /* insertDocument(formData: FormData) {
    this.dataServiceDocument.insertDataDocument(formData).subscribe(res => {
      console.log('Document inséré avec succès:', res);
    }, error => {
      console.error('Erreur lors de l\'insertion du document:', error);
    });
  } */
  insertAllDocument() {
    // Enregistrer tous les documents ajoutés
    // @ts-ignore
    this.documents.forEach(doc => {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10);
      const formData = new FormData();
      formData.append('Url', doc.fichier, doc.fichier.name);
      // @ts-ignore
      formData.append('type_document_id', doc.idTypeDoc); // Mettez l'ID du type de document approprié ici
      formData.append('Date', formattedDate);
      // @ts-ignore
      formData.append('Extension', doc.fichier.type.split('/').pop());
      // @ts-ignore
      formData.append('eleve_id', this.idEl);
     // this.insertDocument(formData);
    });
    this.documents = [];
  }

  async insertDataInscription(inscription: Inscription): Promise<Inscription> {
    return new Promise((resolve, reject) => {
      this.dataInscriptionService.insertDataInscription(inscription).subscribe(
        (res) => {
          let res2: Inscription = res as Inscription;
          this.inscription.id = res2.id;
          resolve(res2);
          console.log('inscription ok');
          console.log(res2);
          Swal.fire({
            title: 'Ndongo Inscrit avec succès',
            validationMessage:'Inscription enregistrée, en attente de paiement...',
            icon: 'success',
            confirmButtonColor: '#2f1514',
          });
        },
        (error) => {
          console.log('inscription !');
          reject(error);
        }
      );
    });
  } 


  /**
   * Mappe un objet parent vers un objet tuteur.
   *
   * @param parent - L'objet parent à mapper.
   * @returns {Tuteur} - L'objet tuteur mappé.
   *
   * @remarks
   * Cette fonction crée un nouvel objet tuteur et copie les propriétés pertinentes de l'objet parent.
   * Cette fonction est utilisée pour remplir les informations de tuteur lorsque l'objet parent est sélectionné.
   */
  mapParentToTuteur(parent: Parent) {
    // Création d'un nouvel objet Tuteur
    let tuteur = new Tuteur();

    // Copie des propriétés de l'objet parent vers l'objet tuteur
    tuteur.Prenom = parent.Prenom;
    tuteur.Nom = parent.Nom;
    tuteur.NumeroTelephone = parent.NumeroTelephone;
    tuteur.Email = parent.Email;
    tuteur.Adresse = parent.Adresse;
    tuteur.Sexe = parent.Sexe;

    // Retourne l'objet tuteur mappé
    return tuteur;
  }
  getTypeDocumentdata() {
    this.dataServiceTypeDocument.getDataTypeDocumentApprenant().subscribe(res => {
      // @ts-ignore
      this.typeDocumentDataResults.push(...res);
      // @ts-ignore
      let typeDocument = document.getElementById('typeDocument')
      // @ts-ignore
      typeDocument.innerHTML = `<option value="" disabled selected>Sélectionner le type de document</option>`

      this.typeDocumentDataResults.forEach((typeDocumentData: TypeDocument) => {
        // Access the properties of TypeDocumentData
        const id = typeDocumentData.id;
        const nom = typeDocumentData.Nom;
        const statut = typeDocumentData.Statut
        //@ts-ignore
        typeDocument.innerHTML += `<option docname = "${nom}" value="${id}">${nom}</option>`
      });
    }, error => {
      console.log('error ', error);
    });
  }
  removeDocument(index: number) {
    // Supprimer l'élément du tableau
    this.documents.splice(index, 1);
    this.updateTable();

  }
  previewDocument(index: number) {
    const fichier = this.documents[index].fichier;
    if (fichier) {
      const url = URL.createObjectURL(fichier);
      window.open(url, '_blank');
    }
  }
  initializeDocumentHandlers() {
    // Attacher les événements de clic et autres ici
    document.getElementById('ajouterBtn')?.addEventListener('click', () => this.ajouterDocument());

  }
  ajouterDocument() {
    const typeSelect = document.getElementById('typeDocument') as HTMLSelectElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const type = typeSelect.options[typeSelect.selectedIndex].textContent;
    const idTypeDoc = Number(typeSelect.value);
    const fichier = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
    if (!type || !fichier) {
      if (!type) {
        Swal.fire('Erreur', 'Veuillez sélectionner un type de document et choisir un fichier.', 'error');
      }
      return;
    }
    const fileType = fichier.type.split('/').pop(); // Obtenir uniquement le type de fichier sans la partie "application/"

    if (fileType !== 'pdf' && fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png') {
      Swal.fire('Erreur', 'Le fichier doit être au format PDF ou image (jpg, jpeg, png).', 'error');
      return;
    }

    if (fichier.size > 10 * 1024 * 1024) {
      Swal.fire('Erreur', 'Le fichier ne doit pas dépasser 10 Mo.', 'error');
      return;
    }

    if (this.documents.find(doc => doc.type === type)) {
      Swal.fire('Erreur', `Le type de document "${type}" est déjà renseigné.`, 'error');
      return;
    }

    this.documents.push({ idTypeDoc: idTypeDoc, type, nom: fichier.name, fichier });
    fileInput.value = ''; // Effacer l'input de fichier
    this.updateTable();
  }
  updateTable() {

    const tableBody = document.getElementById('documentTableBody');
    let tableHTML = '';

    this.documents.forEach(doc => {
      tableHTML += `
        <tr>
          <td>${doc.type}</td>
          <td>${doc.nom}</td>
          <td name="bstable-actions">
            <div class="btn-list">
            <button type="button" class="btn btn-sm btn-danger suppr">
                <span class="fe fe-trash-2"></span>
              </button>
              <button type="button" class="btn btn-sm btn-primary preview" data-url="${URL.createObjectURL(doc.fichier)}">
                <span class="fe fe-eye"></span>
              </button>
            </div>
          </td>
        </tr>
      `;

    });

    if (tableBody) {
      tableBody.innerHTML = tableHTML;
      const buttons = document.getElementsByClassName('suppr');
      Array.from(buttons).forEach((button, index) => {
        button.addEventListener('click', () => this.removeDocument(index));
      });

      const buttonsPreview = document.getElementsByClassName('preview');
      Array.from(buttonsPreview).forEach((button, index) => {
        button.addEventListener('click', () => this.previewDocument(index));
      });
    }



  }
}
