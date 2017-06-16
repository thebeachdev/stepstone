import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './_services/index';
import { NgTableComponent } from 'ng2-table/ng2-table';
import { Company } from './_models/index';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private companies: Array<any> = [];

  public length: number = 0;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' }},
    { title: 'Revenue', name: 'revenue', sort: 'asc', filtering: { filterString: '', placeHolder: 'Filter by Revenue'}},
    { title: 'Year', name: 'year' },
    { title: 'Industry', name: 'industry' }
  ];
  public config: any = {
    paging: false,
    sorting: { columns: this.columns },
    filtering: { filterString: '' }
  };

  constructor(private cs: CompanyService) { }
  // Sort by company name and revenue
  ngOnInit() {// this creates an error I don't have time to fix right now.
    this.onChangeTable(this.config);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }
    if (!columnName) {
      return data;
    }
    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }
  public changeFilter(data: any, config: any) {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }
  public onChangeTable(config: any) {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    this.cs.getCompanies().subscribe(
      data => {
        this.companies = data.companies.map(({ id, name, revenue, year, industry }) => ({ id, name, revenue, year, industry }));
        this.length = this.companies.length;
        let filteredData = this.changeFilter(this.companies, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = filteredData;
        this.length = sortedData.length;
      },
      error => {
        console.log(error);
        return error;
      }
    );

  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}
