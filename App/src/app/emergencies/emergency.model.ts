import { EmergencyLocation } from './location.model';

export class Emergency {
    constructor(public id: string,
                public titulo: string,
                public lesionados: string,
                public puntoIncidente: string,
                public numLesionados: number,
                public atrapados: string,
                public inconsientes: string,
                public descripcion: string,
                public imageUrl: string,
                public userId: string,
                public location: EmergencyLocation) {}
}