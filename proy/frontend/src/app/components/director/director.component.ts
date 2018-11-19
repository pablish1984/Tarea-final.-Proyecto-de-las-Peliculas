import { Component, OnInit } from '@angular/core';

import { DirectorServiceService } from '../../services/director-service.service';
import { NgForm } from '@angular/forms';
import { DirectorModel } from '../../models/director-model';

declare var M: any;

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
  providers: [DirectorServiceService]
})
export class DirectorComponent implements OnInit {

  constructor(public directorService: DirectorServiceService) { }

  ngOnInit() {
    this.getDirectors();  
  }

  resetForm(form?: NgForm){
    if (form) {
      {
        form.reset(form);
        this.directorService.selectedDirector = {
          _id: "",
          name: "",
          nationality: ""
        };
      }    
    }
  }

  getDirectors() {
    return this.directorService.getDirectors()
    .subscribe(resp => {
      this.directorService.list_directors = resp as DirectorModel[];
    })
  }

  addDirector(form: NgForm) {

   if (form.value._id=="" || form.value._id == null) {
      this.directorService.postDirector(form.value).subscribe(resp=> {
        this.resetForm(form);
      M.toast({html: "Director creado correctamente"});
      this.getDirectors();
      })
    } else {
      this.directorService.putDirector(form.value)
    .subscribe(resp=> {
      console.log(resp);
      //this.resetForm(form);
      M.toast({html: "Director actualizado correctamente"});

      this.resetForm(form);
      this.getDirectors();
    })
    }    
  }

  editDirector(director: DirectorModel){
    this.directorService.selectedDirector = director;    
  }

  deleteDirector(_id: string) {

    if (confirm("Are you sure you want to delete it")) {
      this.directorService.deleteDirector(_id).subscribe(resp=> {
          // console.log(resp);
          this.getDirectors();
         }
      ) 
    }
   

  }

}
