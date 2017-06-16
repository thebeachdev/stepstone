import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  private baseUrl = 'http://jsapi.makespi.com/companies/revenu';

  constructor(private http: Http) { }

  getCompanies() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', '9a63588ce404b2bc7b7d05cb0a470ca3');
    return this.http.get(this.baseUrl,{
      search: params
    }).map((response: Response) => response.json());
  }
  addCompany(company: string, revenue: number, year: number) {
    const params: URLSearchParams = new URLSearchParams();
    params.append('key', '9a63588ce404b2bc7b7d05cb0a470ca3');
    params.append('company', company);
    params.append('revenue', revenue.toString());
    params.append('year', year.toString());
    let body = params.toString()
    let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({ headers: headers });
   return this.http.post(this.baseUrl, body, options).map((response: Response) => response.json() );
  }
}
