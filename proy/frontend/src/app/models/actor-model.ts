export class ActorModel {
    _id: string;
    name: string;
    nationality: string;

    constructor(_id='', name='', nationality=''){
        this._id = _id;
        this.name = name;
        this.nationality = nationality;
    }
}
