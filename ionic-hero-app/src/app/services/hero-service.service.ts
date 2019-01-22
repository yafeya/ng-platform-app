import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { Storage } from '@ionic/storage';

import * as Common from 'ng-system-common';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public Heroes: Common.List<Hero> = new Common.List<Hero>();
  public IsLoaded: boolean = false;

  constructor(private storage: Storage) {}

  load(): Promise<boolean> {
    // Return a promise so that we know when this operation has completed
    return new Promise(resolve => {
      // Get the notes that were saved into storage
      this.storage.get('Heros').then(heros => {
        // Only set this.notes to the returned value if there were values stored
        if (heros != null) {
          this.Heroes.AddRange(heros);
        }

        // This allows us to check if the data has been loaded in or not
        this.IsLoaded = true;
        resolve(true);
      });
    });
  }

  save(): void {
    // Save the current array of notes to storage
    this.storage.set('Heros', this.Heroes.Items);
  }

  getHero(id: string): Hero {
    // Return the note that has an id matching the id passed in
    return this.Heroes.Where(x => x.Id == id).FirstOrDefault();
  }

  createHero(name: string, power: string): void {
    // Create a unique id that is one larger than the current largest id
    let id =
      Math.max(...this.Heroes.Items.map(note => parseInt(note.Id)), 0) + 1;

    let hero = new Hero(id.toString(), name, power);
    this.Heroes.Add(hero);

    this.save();
  }

  addHeros(heroes: Hero[]) {
    if (heroes && heroes.length > 0) {
      this.Heroes.AddRange(heroes);
    }
  }

  deleteHero(hero: Hero): void {
    // Get the index in the array of the note that was passed in
    let existed = this.Heroes.Where(x => x.Id == hero.Id).FirstOrDefault();

    // Delete that element of the array and resave the data
    if (existed) {
      this.Heroes.Remove(existed);
      this.save();
    }
  }
}
