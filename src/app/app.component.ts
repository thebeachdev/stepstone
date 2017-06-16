import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './_services/index';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public rows:Array<any> = [];
  public columns: Array<any> = [
    {
      title: 'Name', name: 'name', filtering:
      {
        filterString: '', placeholder: 'Filter by name'
      }},
      {
        title: 'Revenue',
        name: 'revenue',
        sort: false,
        filtering: {
          filterString: '', placeHolder: 'Filter by Revenue'
        },
        {
          title: 'Year',
          name: 'year'
        },
        {
          title: 'Industry',
          name: 'industry'
      }
    ];
  public config: any = {
    paging: false,
    sorting: {columns: this.columns },
    filtering: { filterString: ''}
  };

  private companies: any = { };

  constructor( private cs: CompanyService) {
    this.cs = cs;
 }

  ngOnInit() {// this creates an error I don't have time to fix right now.
    console.log("in init");
    this.onChangeTable(this.config);
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
