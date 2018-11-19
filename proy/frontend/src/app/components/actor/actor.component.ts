import { Component, OnInit } from '@angular/core';

import { ActorServiceService } from '../../services/actor-service.service';
import { NgForm } from '@angular/forms';
import { ActorModel } from '../../models/actor-model';

// es una variable necesaria para usar Toast. Con toast puedo enviar mensajes de accion a mi navegador usando materialize
declare var M: any;

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers: [ActorServiceService]
})
export class ActorComponent implements OnInit {

  constructor(public actorService: ActorServiceService) { }

  ngOnInit() {
    this.getActors();  
  }

  resetForm(form?: NgForm){
    if (form) {
      {
        form.reset(form);
        this.actorService.selectedActor = {
          _id: "",
          name: "",
          nationality: ""
        };
      }    
    }
  }

  getActors() {
    return this.actorService.getActors()
    .subscribe(resp => {
      this.actorService.list_actors = resp as ActorModel[];
    })
  }

  addActor(form: NgForm) {

   if (form.value._id=="" || form.value._id == null) {
      this.actorService.postActor(form.value).subscribe(resp=> {
        this.resetForm(form);
      M.toast({html: "Actor creado correctamente"});
      this.getActors();
      })
    } else {
      this.actorService.putActor(form.value)
    .subscribe(resp=> {
      console.log(resp);
      //this.resetForm(form);
      M.toast({html: "Actor actualizado correctamente"});

      this.resetForm(form);
      this.getActors();
    })
    }    
  }

  editActor(actor: ActorModel){
    this.actorService.selectedActor = actor;    
  }

  deleteActor(_id: string) {

    if (confirm("Are you sure you want to delete it")) {
      this.actorService.deleteActor(_id).subscribe(resp=> {
          // console.log(resp);
          this.getActors();
         }
      ) 
    }
   

  }
}
