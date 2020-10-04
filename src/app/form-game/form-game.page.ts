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
  fav = false;
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

        this.fav = this.editGame.favorite
        this.mode = "edit";
      }
    });
  }

  ngOnInit() {
  }

  gameSubmit() {
    switch (this.mode) {
      case "add":
        this.db.loadGames().then(data => {
          let check = { state: false, index: null };
          console.log('Retrieved Games', data.rows.item(1));
          for (let i = 0; i < data.rows.length; i++) {
            if (data.rows.item(i).favorite) {
              check.state = true;
              check.index = i;
            }

          }
          if (!check.state) {
            let game = {
              name: this.gameForm.value.name,
              favorite: this.fav,
              color: this.gameForm.value.color
            }
            this.db.addGames(game).then(res => {
              this.utils.presentToast('Juego añadido correctamente', 3500, "top");
              this.cancel();
            })

          } else {
            this.utils.presentAlert("Atención", "La capacidad de favoritos es solo de 1, " + data.rows.item(check.index).name + " es su juego favorito ahora mismo", [{ text: "Deseo mantenerlo así" }, {
              text: "Lo quiero substituir", handler: _ => {
                let editedGame = {
                  id: data.rows.item(check.index).id,
                  name: data.rows.item(check.index).name,
                  favorite: false,
                  color: data.rows.item(check.index).color
                }
                this.db.updateGames(editedGame.id, editedGame).then(_ => {
                  let game = {
                    name: this.gameForm.value.name,
                    favorite: this.fav,
                    color: this.gameForm.value.color
                  }
                  this.db.addGames(game).then(res => {
                    this.utils.presentToast('Juego añadido correctamente', 3500, "top");
                    this.cancel();
                  })
                })
              }
            }])
          }
        })
        break;

      case "edit":
        this.db.loadGames().then(data => {
          let check = { state: false, index: null };
          console.log('Retrieved Games', data.rows.item(1));
          for (let i = 0; i < data.rows.length; i++) {
            if (data.rows.item(i).favorite) {
              check.state = true;
              check.index = i;
            }

          }
          if (!check.state) {
            let game = {
              name: this.gameForm.value.name,
              favorite: this.fav,
              color: this.gameForm.value.color
            }
            this.db.updateGames(this.editGame.id, game).then(res => {
              this.utils.presentToast('Juego editado correctamente', 3500, "top");
              this.cancel();
            })

          } else {
            this.utils.presentAlert("Atención", "La capacidad de favoritos es solo de 1, " + data.rows.item(check.index).name + " es su juego favorito ahora mismo", [{ text: "Deseo mantenerlo así" }, {
              text: "Lo quiero substituir", handler: _ => {
                let editedGame = {
                  id: data.rows.item(check.index).id,
                  name: data.rows.item(check.index).name,
                  favorite: false,
                  color: data.rows.item(check.index).color
                }
                this.db.updateGames(editedGame.id, editedGame).then(_ => {
                  let game = {
                    name: this.gameForm.value.name,
                    favorite: this.fav,
                    color: this.gameForm.value.color
                  }
                  this.db.updateGames(this.editGame.id, game).then(res => {
                    this.utils.presentToast('Juego editado correctamente', 3500, "top");
                    this.cancel();
                  })
                })
              }
            }])
          }
        })
        break;
    }
  }
  onSelectionChange() {
    this.fav = !this.fav;
    console.log(this.fav)
    console.log(this.gameForm.value.color)
  }
  cancel() {
    this.gameForm.reset;
    this.nav.pop();
  }

}
