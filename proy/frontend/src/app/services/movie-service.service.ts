import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MovieModel } from '../models/movie-model';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  selectedMovie: MovieModel;
  list_movies: MovieModel[];

  constructor(private http: HttpClient) {
    this.selectedMovie = new MovieModel();
   }

  getMovies () {
    return this.http.get('http://localhost:3000/api/movies');
  }

  postMovie(Movie: MovieModel) {
    return this.http.post('http://localhost:3000/api/movies', Movie);
  }

  putMovie(newMovie: MovieModel) {
    return this.http.put('http://localhost:3000/api/movies/'+`${newMovie._id}`, newMovie);
  }

  deleteMovie(_id: string) {
   return this.http.delete('http://localhost:3000/api/movies/'+`${_id}`);
  }


}
