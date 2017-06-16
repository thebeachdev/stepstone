import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { CompanyService } from './company.service';
import { Company } from '../_models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyResolver implements Resolve<Company> {

  constructor(private cs:CompanyService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.cs.getCompanies().map(
      data => {
        return data;
      },
      error => {
        return error;
      }
    )
  }
}
