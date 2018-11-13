import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { environment } from '../environments/environment';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path : '', component : ProductsComponent },
      { path : 'products', component : ProductsComponent },
      { path : 'login', component : LoginComponent },

      { path : 'admin/products/new', component : ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuard] },
      { path : 'admin/products/:id', component : ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuard] },
      { path : 'admin/products', component : AdminProductsComponent, canActivate : [AuthGuard, AdminAuthGuard] }
    ]),
    NgbModule.forRoot()
  ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
