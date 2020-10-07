import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public games = [];
  public test = "Ahoy"
  constructor(private route: Router, private utils: UtilsService, private db: DbService) {
  }

  ionViewWillEnter() {
    this.games = [];
    this.db.getDatabaseState().subscribe(state => {
      if (state) {
        this.db.loadGames().then(data => {

          console.log('Retrieved Games', data.rows.item(1));
          for (let i = 0; i < data.rows.length; i++) {
            this.games.push(data.rows.item(i));
          }
        })
      }
    })
  }

  openGame(game) {
    console.log(game)
    let params: NavigationExtras = {
      state: {
        game: game
      }
    }
    this.route.navigate(["/game"], params)
  }
  addGame() {
    this.route.navigate(['/gameform']);
  }
}
