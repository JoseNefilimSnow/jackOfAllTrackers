import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-form-game',
  templateUrl: './form-game.page.html',
  styleUrls: ['./form-game.page.scss'],
})
export class FormGamePage implements OnInit {

  editGame;
  mode = "add";
  fav;
  gameForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    color: ['', [Validators.required]]
  });


  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private db: DbService, private nav: NavController, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        console.log("Game to edit", this.router.getCurrentNavigation().extras.state.game);
        this.editGame = this.router.getCurrentNavigation().extras.state.game;
        this.gameForm.controls.name.setValue(this.editGame.name);
        this.gameForm.controls.color.setValue(this.editGame.color);

        this.mode = "edit";
      }
    });
  }

  ngOnInit() {
  }

  gameSubmit() {
    let game = {
      name: this.gameForm.value.name,
      color: this.gameForm.value.color
    }
    switch (this.mode) {
      case "add":

        this.db.addGames(game).then(res => {
          this.utils.presentToast('Juego añadido correctamente', 3500, "top");
          this.cancel();
        })

        break;

      case "edit":

        this.db.updateGames(this.editGame.id, game).then(res => {
          this.utils.presentToast('Juego editado correctamente', 3500, "top");
          this.cancel();
        })
        break;
    }
  }

  cancel() {
    this.gameForm.reset;
    this.router.navigate(['/home']);
  }

}
