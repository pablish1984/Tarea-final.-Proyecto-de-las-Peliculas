import { DirectorModel } from './director-model';
import { ActorModel } from './actor-model';


export class MovieModel {
    _id: string;
    titulo: string;
    categoria: string;
    genero: string;
    annyo: number;
    pais_produccion: string;
    // list_users: ;
    duracion: number;
    score: number;
    director: DirectorModel;
    actors: ActorModel[];
    image: string;

    // tslint:disable-next-line:max-line-length
    constructor(_id = '', titulo = '', categoria = '', genero = '', annyo = 1900, pais_produccion = '', director = { _id: '', name: '', nationality: ''}, image = '') {
        this._id = _id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.genero = genero;
        this.annyo = annyo;
        this.pais_produccion = pais_produccion;
        this.duracion = 0;
        this.score = 0;
        this.director = director;
        this.actors =  [];
        this.image = image;

    }

}
