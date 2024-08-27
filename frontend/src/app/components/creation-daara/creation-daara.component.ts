import {AfterViewInit, Component} from '@angular/core';
import 'jquery-steps/build/jquery.steps.min.js';
import {DataDepartementService, Departement} from "../../services/data-departement.service";
@Component({
  selector: 'app-creation-daara',
  templateUrl: './creation-daara.component.html',
  styleUrls: ['./creation-daara.component.scss']
})
export class CreationDaaraComponent implements AfterViewInit{
  departements: Departement[] = [];
  selectedDepartementId: number | null = null;
  constructor(private departementService: DataDepartementService) { }
  ngAfterViewInit(): void {
    this.loadDepartement();
    this.initializeWizard();
  }
  private loadDepartement(){
    this.departementService.getDepartements().subscribe((data: Departement[]) => {
      this.departements = data;
    });
  }
  onDepartementChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDepartementId = Number(selectElement.value);
    console.log('Selected Departement ID:', this.selectedDepartementId);
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
        finish: "Terminer",
        next: "Suivant",
        previous: "Précédent",
        loading: "Loading ..."
      },
    });
    onStepChanging: // @ts-ignore
        (event: any, currentIndex: any, newIndex: any) => {
          switch (currentIndex) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              break;
            case 4:
              break;

          }

          if (currentIndex < newIndex) {
            // @ts-ignore
            return this.validateForm(currentIndex, {statusValidation: statusValidation, checkedCount: checkedCount});
          } else {
            return true;
          }
        }
  }
}
