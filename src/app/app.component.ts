import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './_services/index';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private companies: any = { };

  constructor(private route: ActivatedRoute, private cs: CompanyService) {
    this.cs = cs;
 }

  ngOnInit() {
    console.log("in init");
    this.cs.getCompanies().subscribe(
      data => {
        this.companies = data.companies.map(({ id, name, revenue, year, industry }) => ({ id, name, revenue, year, industry }))
      },
      error => {
        console.log(error);
        return error;
      }
    );
  }
}
