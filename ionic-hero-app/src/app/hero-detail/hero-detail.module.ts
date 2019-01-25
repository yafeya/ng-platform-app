import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeroDetailPage } from './hero-detail.page';
import { HeroValidatorDirective } from './directives/hero-validator.directive';

const routes: Routes = [
  {
    path: '',
    component: HeroDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeroDetailPage, HeroValidatorDirective]
})
export class HeroDetailPageModule {}
