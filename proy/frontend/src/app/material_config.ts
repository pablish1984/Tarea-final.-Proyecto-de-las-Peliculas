import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';

import { MatSelectModule } from '@angular/material/select';



import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,  MatSelectModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule,  MatSelectModule, MatFormFieldModule]
})

export class MaterialModule { }
