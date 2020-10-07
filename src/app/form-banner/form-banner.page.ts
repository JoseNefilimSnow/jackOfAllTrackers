import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DbService } from '../services/db/db.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.page.html',
  styleUrls: ['./form-banner.page.scss'],
})
export class FormBannerPage implements OnInit {

  gameId;
  gameColor;
  editBanner;
  mode = "add";
  fav;
  bannerForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    color: ['', [Validators.required]]
  });


  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private db: DbService, private nav: NavController, private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.gameId = this.router.getCurrentNavigation().extras.state.gameId;
        this.gameColor = this.router.getCurrentNavigation().extras.state.gameColor;
        if (this.router.getCurrentNavigation().extras.state.banner) {
          this.editBanner = this.router.getCurrentNavigation().extras.state.banner
          this.bannerForm.controls.name.setValue(this.editBanner.name);
          this.bannerForm.controls.color.setValue(this.editBanner.color);

          this.mode = "edit";
        }
      }
    });
  }

  ngOnInit() {
  }

  bannerSubmit() {
    let banner = {
      name: this.bannerForm.value.name,
      color: this.bannerForm.value.color,
      end_date: this.bannerForm.value.end_date,
      state: "Activo",
      id_games: this.gameId
    }
    console.log('Banner', banner)
    switch (this.mode) {
      case "add":

        this.db.addBanners(banner).then(res => {
          this.utils.presentToast('Banner añadido correctamente', 3500, "top");
          this.cancel();
        })

        break;

      case "edit":

        this.db.updateBanners(this.editBanner.id, banner).then(res => {
          this.utils.presentToast('Juego editado correctamente', 3500, "top");
          this.cancel();
        })
        break;
    }
  }

  cancel() {
    this.bannerForm.reset;
    this.router.navigate(['/home']);
  }


}
