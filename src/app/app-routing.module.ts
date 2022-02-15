import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvanceFormComponent } from './advance-form/advance-form.component';
import { BasicFormComponent } from './basic-form/basic-form.component';

const routes: Routes = [
  { path: 'basic', component: BasicFormComponent },
  { path: 'advance', component: AdvanceFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
