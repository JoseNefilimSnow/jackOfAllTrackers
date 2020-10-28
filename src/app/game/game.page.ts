import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game = { id: null, name: "", color: "" };
  banners = [];
  constructor(public utils: UtilsService, private nav: NavController, private db: DbService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        console.log("Game", this.router.getCurrentNavigation().extras.state.game);
        this.game = this.router.getCurrentNavigation().extras.state.game;

      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.banners = [];
    console.log(this.game.id)
    this.db.loadBannersFromGames(this.game.id).then(data => {
      console.log(data)
      let hoy = new Date();
      for (let i = 0; i < data.rows.length; i++) {
        if (new Date(data.rows.item(i).end_date).getTime() - hoy.getTime() < 0 && data.rows.item(i).state !== "Caducado") {
          this.db.updateBanners(data.rows.item(i).id, { name: data.rows.item(i).name, color: data.rows.item(i).color, end_date: data.rows.item(i).end_date, state: "Caducado", id_games: data.rows.item(i).id_games }).then(_ => this.ionViewWillEnter())
        } else {
          this.banners.push(data.rows.item(i));
        }
      }
    })
  }

  addBanner() {
    let params: NavigationExtras = { state: { gameId: this.game.id, gameColor: this.game.color } }
    this.router.navigate(['/bannerform'], params);
  }

  openBanner(banner) {
    let params: NavigationExtras = { state: { banner: banner } }
    this.router.navigate(['/banner'], params)
  }

  editGame() {
    let params: NavigationExtras = { state: { game: this.game } }
    this.router.navigate(['/gameform'], params)
  }

  deleteGame() {
    this.utils.presentAlert("¡Cuidado!", "¿Realmente deseas borrar " + this.game.name + " de tu lista de juegos?", [{ text: "Nope" }, {
      text: "¡Adelante!", handler: _ => {
        this.db.deleteGames(this.game.id).then(data => {
          this.nav.pop();
        })

      }
    }])
  }
}
