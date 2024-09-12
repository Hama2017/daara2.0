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
    ief_id!: number;
    // Nouveaux attributs pour stocker les informations complètes
    departement!: {
        id: number,
        nomDepartement: string,
        region_id: number,
        created_at: string,
        updated_at: string,
        region: {
            id: number,
            nomRegion: string,
            codeRegion: string,
            created_at: string,
            updated_at: string
        }
    };

    responsable!: {
        id: number,
        nomUser: string,
        prenomUser: string,
        emailUser: string,
        telephoneUser: string,
        idProfil: number,
        created_at: string,
        updated_at: string
    };
    ief!:{
        id: number;
        nom: string;
        ia_id: number;
    }

    constructor(data?: {
        nomDaara?: string,
        adresseDaara?: string,
        coordonneesDaara?: string,
        dateCreationDaara?: string,
        telephoneDaara?: string,
        descriptionDaara?: string,
        department_id?: number,
        responsable_id?: number,
        ief_id?: number,
        emailDaara?: string,
        departement?: any,
        responsable?: any,
        ief?: any,
    }) {
        this.nomDaara = data?.nomDaara || '';
        this.adresseDaara = data?.adresseDaara || '';
        this.coordonneesDaara = data?.coordonneesDaara || '';
        this.dateCreationDaara = data?.dateCreationDaara || '';
        this.telephoneDaara = data?.telephoneDaara || '';
        this.descriptionDaara = data?.descriptionDaara || '';
        this.department_id = data?.department_id || 0;
        this.ief_id = data?.ief_id || 0;
        this.responsable_id = data?.responsable_id || 0;
        this.emailDaara = data?.emailDaara || '';
        this.departement = data?.departement || {};
        this.responsable = data?.responsable || {};
        this.ief = data?.ief || {};
    }
    // Méthode pour obtenir les coordonnées en tant que tableau de nombres [latitude, longitude]
    getCoordonnees(): [number, number] {
        const [latitude, longitude] = this.coordonneesDaara.split(',').map(Number);
        return [latitude, longitude];
    }
}
