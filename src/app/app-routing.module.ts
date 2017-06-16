import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { CompanyResolver } from './_services/index';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // resolve: {
    //   company: CompanyResolver
    // }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CompanyResolver]
})
export class AppRoutingModule { }
