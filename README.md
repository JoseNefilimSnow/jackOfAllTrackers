# Jack of all Trackers
### "Basic as to roll"

This is a basic tracker that would store information locally from rolls on gacha-games you play. Easy, no big complicated mechanics.

## Entity Diagram (WIP)

- Games(id,name:string,color)
- Banners (id,id_game,name:string,end_date:Date)
- Rolls (id,id_banner,name:string,rarity:string,number:number)