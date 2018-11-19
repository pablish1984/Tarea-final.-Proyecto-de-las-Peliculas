
import { Component, OnInit } from '@angular/core';

import { MovieServiceService } from '../../services/movie-service.service';

import { DirectorServiceService } from '../../services/director-service.service';
import { DirectorModel } from '../../models/director-model';

import { ActorServiceService } from '../../services/actor-service.service';
import { ActorModel } from '../../models/actor-model';

import { NgForm } from '@angular/forms';
import { MovieModel } from '../../models/movie-model';

declare var M: any;

export interface Category {
      value: string;
}

export interface genre {
  value: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieServiceService]
})
export class MovieComponent implements OnInit {

  constructor(public movieService: MovieServiceService, public directorService: DirectorServiceService, public actorService: ActorServiceService) { }



  public list_genre: genre[] = [
    {value: 'Sci-Fiction'},
    {value: 'Drama'},
    {value: 'Comedy'},
    {value: 'Martial-Arts'},
    {value: 'Horror'},
    {value: 'Belic'},
    {value: 'Documentary'},
    {value: 'Sports'},
    {value: 'Action'}];

  public list_category: Category[] = [
    {value: 'AA'},
    {value: 'A'},
    {value: 'B'},
    {value: 'C'}];

  ngOnInit() {
     this.getMovies();

     this.directorService.getDirectors()
    .subscribe(resp => {
      this.directorService.list_directors = resp as DirectorModel[];
    });

    this.actorService.getActors().subscribe(resp=>{
      this.actorService.list_actors = resp as ActorModel[];
    });
}

  resetForm(form?: NgForm) {
    if (form) {
      {
        form.reset(form);
        this.movieService.selectedMovie = new MovieModel();
      }
    }
  }

  getMovies() {
    return this.movieService.getMovies()
    .subscribe(resp => {
       var aux = resp as MovieModel[];

       if (aux.length !== 0) {
         this.movieService.list_movies = resp as MovieModel[];
         }



    // console.log(this.movieService.list_movies[0].director.name);


    });
  }

  addMovie(form: NgForm) {

   if (form.value._id) {
      this.movieService.postMovie(form.value).subscribe(resp=> {
        this.resetForm(form);
      M.toast({html: 'Director creado correctamente'});
      this.getMovies();
      })
    } else {
      this.movieService.putMovie(form.value)
    .subscribe(resp=> {
      console.log(resp);
      // this.resetForm(form);
      M.toast({html: 'Director actualizado correctamente'});

      this.resetForm(form);
      this.getMovies();
    });
    }
  }

  editMovie(movie: MovieModel) {
    this.movieService.selectedMovie = movie;
  }

  deleteMovie(_id: string) {

    if (confirm("Are you sure you want to delete it")) {
      this.movieService.deleteMovie(_id).subscribe(resp=> {
          // console.log(resp);
          this.getMovies();
         }
      )
    }


  }

}
