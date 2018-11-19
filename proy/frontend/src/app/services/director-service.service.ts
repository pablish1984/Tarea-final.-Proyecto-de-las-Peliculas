import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {DirectorModel} from '../models/director-model';

@Injectable({
  providedIn: 'root'
})
export class DirectorServiceService {

  selectedDirector: DirectorModel;
  list_directors: DirectorModel[];

  readonly api_URI: "http://localhost:3000/api/";

  constructor(private http: HttpClient) {
    this.selectedDirector = new DirectorModel();
   }

  getDirectors () {
    return this.http.get('http://localhost:3000/api/directors');
  }

  postDirector(Director: DirectorModel) {
    return this.http.post('http://localhost:3000/api/directors', Director);
  }

  putDirector(newDirector: DirectorModel) {
    return this.http.put('http://localhost:3000/api/directors/'+`${newDirector._id}`, newDirector);
  }

  deleteDirector(_id: string) {
   return this.http.delete('http://localhost:3000/api/directors/'+`${_id}`);
  }
}
