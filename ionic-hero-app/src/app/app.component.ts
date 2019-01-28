import { Component, OnInit, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as Common from 'ng-system-common';
import { Hero } from './models/hero';
import { HeroService } from './services/hero-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  private mLogger: Common.ILogger;

  async ngOnInit() {
    await this.heroService.load();
    this.removeInvalidHeroes();
    this.initHeroesWhenEmpty();
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private heroService: HeroService,
    @Inject(Common.LoggerFactoryToken)
    private loggerFactory: Common.ILoggerFactory
  ) {
    this.loggerFactory.AddDebug();
    this.initializeApp();
  }

  private initHeroesWhenEmpty() {
    if (this.heroService.Heroes.IsEmpty()) {
      let initHeros = [
        new Hero('1', 'Captain America', 'Super Soldier'),
        new Hero('2', 'Iron Man', 'Armor & Millionare'),
        new Hero('3', 'Thor', 'God with Thunder'),
        new Hero('4', 'Hulk', 'Smash everything'),
        new Hero('5', 'Halk Eye', 'Arrow Sniper'),
        new Hero('6', 'Black Widow', 'Expert of fighting & interrogating')
      ];
      this.heroService.addHeros(initHeros);
    }
  }

  private removeInvalidHeroes() {
    let invalidHeroes: Common.List<Hero> = new Common.List<Hero>();
    for (let hero of this.heroService.Heroes) {
      if (!hero.Id) {
        invalidHeroes.Add(hero);
      }
    }
    for (let invalidHero of invalidHeroes) {
      this.heroService.deleteHero(invalidHero);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
