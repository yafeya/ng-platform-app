import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { Hero } from '../models/hero';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

import * as Common from 'ng-system-common';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.page.html',
  styleUrls: ['./hero-list.page.scss']
})
export class HeroListPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private heroService: HeroService
  ) {}
  ngOnInit() {}

  addHero() {
    this.alertCtrl
      .create({
        header: 'New Hero',
        message: 'Who is this hero, and his or her power?',
        inputs: [
          {
            type: 'text',
            name: 'name'
          },
          {
            type: 'text',
            name: 'power'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              this.heroService.createHero(data.name, data.power);
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  directToDetail(hero: Hero) {
    let id = hero.Id;
    let url = `/hero-detail/${id}`;
    let options: NavigationOptions = {
      animated: true,
      animationDirection: 'forward'
    };
    this.navCtrl.navigate(url, options);
  }
}
