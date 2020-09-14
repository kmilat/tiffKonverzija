import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth-guard.service';
import { RedirectComponent } from './RedirectComponent';
import { SlikeComponent } from './slike/slike.component';




const routes: Routes = [
  { path: 'slike', component: SlikeComponent },
  { path: '', component: RedirectComponent, pathMatch: 'full' },
  { path: '**', component: SlikeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
