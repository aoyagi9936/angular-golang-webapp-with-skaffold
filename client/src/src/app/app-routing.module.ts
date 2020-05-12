import { NgModule } from '@angular/core';
import { TopComponent } from './modules/top/top.component';
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', component: TopComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
