import { Component, OnInit, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as Common from 'ng-system-common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  private mLogger: Common.ILogger;

  ngOnInit(): void {
    this.mLogger = this.loggerFactory.CreateLogger('AppComponent');
    let list = new Common.List<string>();
    list.AddRange(['Luke', 'Leiya']);
    let results = list.Where(x => x.length > 0);
    for (let result of results) {
      this.mLogger.Error(result);
    }
  }
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    @Inject(Common.LoggerFactoryToken) private loggerFactory: Common.ILoggerFactory
  ) {
    this.loggerFactory.AddDebug();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
