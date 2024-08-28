export class Daara {
    id!: number;
    nomDaara!: string;
    adresseDaara!: string;
    coordonneesDaara!: string;
    telephoneDaara!: string;
    emailDaara!: string;
    dateCreationDaara!: string;
    descriptionDaara!: string;
    department_id!: number;
    responsable_id!: number;

    constructor(data?: {
        nomDaara?: string,
        adresseDaara?: string,
        coordonneesDaara?: string,
        dateCreationDaara?: string,
        telephoneDaara?: string,
        descriptionDaara?: string,
        department_id?: number,
        responsable_id?: number,
        emailDaara?: string,
    }) {
        this.nomDaara = data?.nomDaara || '';
        this.adresseDaara = data?.adresseDaara || '';
        this.coordonneesDaara = data?.coordonneesDaara || '';
        this.dateCreationDaara = data?.dateCreationDaara || '';
        this.telephoneDaara = data?.telephoneDaara || '';
        this.descriptionDaara = data?.descriptionDaara || '';
        this.department_id = data?.department_id || 0;
        this.responsable_id = data?.responsable_id || 0;
        this.emailDaara = data?.emailDaara || '';
    }
    // Méthode pour obtenir les coordonnées en tant que tableau de nombres [latitude, longitude]
    getCoordonnees(): [number, number] {
        const [latitude, longitude] = this.coordonneesDaara.split(',').map(Number);
        return [latitude, longitude];
    }
}
