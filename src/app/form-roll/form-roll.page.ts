import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  NavController
} from '@ionic/angular';
import {
  DbService
} from '../services/db/db.service';
import {
  UtilsService
} from '../services/utils/utils.service';

@Component({
  selector: 'app-form-roll',
  templateUrl: './form-roll.page.html',
  styleUrls: ['./form-roll.page.scss'],
})
export class FormRollPage implements OnInit {
  bannerId;
  bannerColor;
  rollForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    rarity: ['', [Validators.required]]
  });
  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private db: DbService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.bannerId = this.router.getCurrentNavigation().extras.state.bannerId;
        this.bannerColor = this.router.getCurrentNavigation().extras.state.bannerColor;
      }
    });
  }

  ngOnInit() { }

  rollSubmit() {
    this.db.loadRollsFromBanner(this.bannerId).then(data => {
      let roll = {
        name: this.rollForm.value.name,
        type: this.rollForm.value.type,
        rarity: this.rollForm.value.rarity,
        roll_number: data.rows.length + 1,
        id_banner: this.bannerId
      }
      this.db.addRolls(roll).then(res => {
        this.utils.presentToast('Roll añadido correctamente', 3500, "top");
        this.cancel();
      })
    })


  }

  cancel() {
    this.rollForm.reset;
    this.nav.pop();
  }


}