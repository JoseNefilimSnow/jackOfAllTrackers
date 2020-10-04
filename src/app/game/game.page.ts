import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game;
  constructor(private utils: UtilsService, private db: DbService, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        console.log("Game", this.router.getCurrentNavigation().extras.state.game);
        this.game = this.router.getCurrentNavigation().extras.state.game;

      }
    });
  }

  ngOnInit() {
  }

}
