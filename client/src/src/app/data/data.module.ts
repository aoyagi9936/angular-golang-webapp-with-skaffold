import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule, BASE_PATH } from './webapp-client';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.webappApiUrl }
  ]
})
export class DataModule { }
