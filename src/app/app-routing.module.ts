import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstFormComponent } from './components/survey-forms/first-form/first-form.component';
import { SecondFormComponent } from './components/survey-forms/second-form/second-form.component';

const routes: Routes = [
  { path: '', component: FirstFormComponent },
  { path: 'person', component: SecondFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
