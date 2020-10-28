import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  banner;
  rolls = [];
  rollcolor = [];
  constructor(private utils: UtilsService, private nav: NavController, private db: DbService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        console.log("Banner", this.router.getCurrentNavigation().extras.state.banner);
        this.banner = this.router.getCurrentNavigation().extras.state.banner;

      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.utils.presentLoading("Cargando roles");

    this.rolls = [];
    this.db.loadRollsFromBanner(this.banner.id).then(data => {
      console.log(data)
      for (let i = 0; i < data.rows.length; i++) {
        this.rolls.push(data.rows.item(i));
        console.log(this.rolls)
        switch (data.rows.item(i).rarity) {
          case "legendary":
            this.rolls[i].rarity = "Legendario// 5 estrellas"
            this.rollcolor[i] = "dorado";
            break;
          case "epic":
            this.rolls[i].rarity = "Épico // 4 estrellas"
            this.rollcolor[i] = "morado";
            break;
          case "rare":
            this.rolls[i].rarity = "Raro// 3 estrellas"
            this.rollcolor[i] = "secondary";
            break;
          case "common":
            this.rolls[i].rarity = "Común// < 3 estrellas"
            this.rollcolor[i] = "medium";
            break;
        }
      }
    })
  }

  addRoll() {
    let params: NavigationExtras = { state: { bannerId: this.banner.id, bannerColor: this.banner.color } }
    this.router.navigate(['/rollform'], params);
  }

  editBanner() {
    let params: NavigationExtras = { state: { banner: this.banner } }
    this.router.navigate(['/bannerform'], params)
  }

  deleteBanner() {
    this.utils.presentAlert("¡Cuidado!", "¿Realmente deseas borrar: " + this.banner.name + " ?", [{ text: "Nope" }, {
      text: "¡Adelante!", handler: _ => {
        this.db.deleteBanners(this.banner.id).then(data => {
          this.nav.pop();
        })

      }
    }])
  }
  deleteRoll(roll) {
    this.utils.presentAlert("¡Cuidado!", "¿Realmente deseas borrar el roll: " + roll.name + " ?", [{ text: "Nope" }, {
      text: "¡Adelante!", handler: _ => {
        this.db.deleteRolls(roll.id).then(data => {
          this.ionViewWillEnter();
        })

      }
    }])
  }
}
