import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TopComponent } from './modules/top/top.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material/material.module';
import { SharedModule } from './shared/shared.module';
import { DataModule } from './data/data.module';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteComponent } from './layout/header/favorite/favorite.component';
import { AccountComponent } from './layout/header/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoriteComponent,
    AccountComponent,
    FooterComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
