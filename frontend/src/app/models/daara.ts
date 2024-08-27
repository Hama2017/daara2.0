export class Daara {
    id: number;
    nomDaara: string;
    adresseDaara: string;
    coordonneesDaara: string;
    telephoneDaara: string;
    emailDaara: string;
    dateCreationDaara: string;
    descriptionDaara: string;
    departmentId: number;
    responsableId: number;

    constructor(data: any) {
        this.id = data.id;
        this.nomDaara = data.nomDaara;
        this.adresseDaara = data.adresseDaara;
        this.coordonneesDaara = data.coordonneesDaara;
        this.telephoneDaara = data.telephoneDaara;
        this.emailDaara = data.emailDaara;
        this.dateCreationDaara = data.dateCreationDaara;
        this.descriptionDaara = data.descriptionDaara;
        this.departmentId = data.department_id;
        this.responsableId = data.responsable_id;
    }

    // Méthode pour obtenir les coordonnées en tant que tableau de nombres [latitude, longitude]
    getCoordonnees(): [number, number] {
        const [latitude, longitude] = this.coordonneesDaara.split(',').map(Number);
        return [latitude, longitude];
    }
}
