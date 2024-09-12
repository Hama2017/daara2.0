import {IEF} from "./ief";

export class IA{
    id!: number;
    nom!: string;
    ief!: {
        id: number;
        nom: string;
        ia_id: number;
    };
}