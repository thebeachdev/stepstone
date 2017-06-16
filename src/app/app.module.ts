import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CompanyService } from './_services/index';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { OrderByPipe } from './_pipes/order-by.pipe';
import { Ng2TableModule } from 'ng2-table/ng2-table';
@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    Ng2TableModule,
    AppRoutingModule
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
