import {
  Platform
} from '@ionic/angular';
import {
  Injectable
} from '@angular/core';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  BehaviorSubject
} from 'rxjs';
import {
  UtilsService
} from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private plt: Platform, private sqlite: SQLite, private utils: UtilsService) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'games.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          db.executeSql('CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR NOT NULL,color VARCHAR NOT NULL);', [])
            .catch(e => console.log(e));
          db.executeSql('CREATE TABLE IF NOT EXISTS banners(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR NOT NULL,id_games INTEGER NOT NULL,end_date DATE NOT NULL,state VARCHAR NOT NULL,color VARCHAR NOT NULL);', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
          db.executeSql('CREATE TABLE IF NOT EXISTS rolls(id INTEGER PRIMARY KEY AUTOINCREMENT,id_banner INTEGER NOT NULL,name VARCHAR NOT NULL,type VARCHAR NOT NULL, rarity VARCHAR NOT NULL,roll_number INTEGER NOT NULL);', [])
            .catch(e => console.log(e));

          this.database = db;
          this.dbReady.next(true);
        })
        .catch(e => console.log(e));


    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  loadGames() {
    return this.database.executeSql('SELECT * FROM games ', []);
  }

  addGames(games) {
    return this.database.executeSql('INSERT INTO games (name,color) VALUES (?,?)', [games.name, games.color])

  }

  updateGames(id, games) {
    return this.database.executeSql(`UPDATE games SET name = ?,color = ? WHERE id = ${id}`, [games.name, games.color]).catch(err => console.log(err));

  }

  deleteGames(id) {
    return this.database.executeSql('DELETE FROM games WHERE id = ?', [id])

  }

  deleteAllGames() {
    this.database.executeSql('SELECT * FROM games', []).then(data => {
      let count = 0;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.deleteGames(data.rows.item(i).id)
          count++;
        }
      }
      this.utils.presentAlert("", "Se han Borrado " + count + " registros", [{
        text: "Entendido",
      }]);
    })
  }

  loadBanners() {
    return this.database.executeSql('SELECT * FROM banners ', []);
  }

  loadBannersFromGames(id_games) {
    return this.database.executeSql(`SELECT * FROM banners where id_games = ${id_games}`, [])

  }


  addBanners(banners) {
    return this.database.executeSql('INSERT INTO banners (name,id_games,end_date,state,color) VALUES (?,?,?,?,?)', [banners.name, banners.id_games, banners.end_date, banners.state, banners.color]).catch(err => console.log(err))
  }

  updateBanners(id, banners) {
    return this.database.executeSql(`UPDATE banners SET name=?, end_date=?, state=?, color=? WHERE id = ${id}`, [banners.name, banners.end_date, banners.state, banners.color]).catch(err => console.log(err));
  }

  deleteBanners(id) {
    return this.database.executeSql('DELETE FROM banners WHERE id = ?', [id])
  }

  deleteAllBanners() {
    this.database.executeSql('SELECT * FROM banners', []).then(data => {
      let count = 0;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.deleteBanners(data.rows.item(i).id)
          count++;
        }
      }
      this.utils.presentAlert("", "Se han Borrado " + count + " registros", [{
        text: "Entendido",
      }]);
    })
  }


  loadRolls() {
    return this.database.executeSql('SELECT * FROM rolls ', []);
  }

  loadRollsFromBanner(id_banner) {
    return this.database.executeSql(`SELECT * FROM rolls where id_banner = ${id_banner}`, [])

  }

  addRolls(rolls) {
    return this.database.executeSql('INSERT INTO rolls (name,id_banner,rarity,type,roll_number) VALUES (?,?,?,?,?)', [rolls.name, rolls.id_banner, rolls.rarity, rolls.type, rolls.roll_number]).catch(err => console.log(err))
  }

  updateRolls(id, rolls) {
    return this.database.executeSql(`UPDATE rolls SET name=?,rarity=?,type,roll_number WHERE id = ${id}`, [rolls.name, rolls.id_banner, rolls.rarity, rolls.type, rolls.roll_number]).catch(err => console.log(err));
  }

  deleteRolls(id) {
    return this.database.executeSql('DELETE FROM rolls WHERE id = ?', [id])
  }

  deleteAllRolls() {
    this.database.executeSql('SELECT * FROM rolls', []).then(data => {
      let count = 0;
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.deleteRolls(data.rows.item(i).id)
          count++;
        }
      }
      this.utils.presentAlert("", "Se han Borrado " + count + " registros", [{
        text: "Entendido",
      }]);
    })
  }
}
