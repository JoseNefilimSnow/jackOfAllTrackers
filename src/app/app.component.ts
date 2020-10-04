import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from './services/db/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: Router,
    private db: DbService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.db.getDatabaseState().subscribe(state => {
        if (state) {
          this.db.loadGames().then(data => {

            console.log('Retrieved Games', data.rows.item(1));
            for (let i = 0; i < data.rows.length; i++) {
              if (data.rows.item(i).favorite) {
                this.openGame(data.rows.item(i));
              }

            }
          })
        }
      })
    });
  }
  openGame(game) {
    let params: NavigationExtras = {
      state: {
        game_id: game.id,
        game_name: game.name,
        game_color: game.color,
        game_fav: game.favorite
      }
    }
    this.route.navigate(["/game", params])
  }
}
