import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero-service.service';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.page.html',
  styleUrls: ['./hero-detail.page.scss']
})
export class HeroDetailPage implements OnInit {
  private hero: Hero;

  Name: string = String.Empty();
  Power: string = String.Empty();
  IsEditing: boolean = false;

  get IsValid(): boolean{
    return !String.IsNullOrEmpty(this.Name);
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private navControl: NavController
  ) {
    this.hero = new Hero(String.Empty(), String.Empty(), String.Empty());
  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    // Check that the data is loaded before getting the note
    // This handles the case where the detail page is loaded directly via the URL
    if (this.heroService.IsLoaded) {
      this.hero = this.heroService.getHero(id);
    } else {
      await this.heroService.load();
      this.hero = this.heroService.getHero(id);
    }

    this.Name = this.hero.Name;
    this.Power = this.hero.Power;
  }

  editHero() {
    this.IsEditing = true; 
  }

  submitEdit() {
    if (this.IsValid) {
      this.hero.Name = this.Name;
      this.hero.Power = this.Power;
      this.heroService.save();
      this.navControl.navigateBack('hero-list');
    }
  }

  deleteHero() {
    this.heroService.deleteHero(this.hero);
    this.navControl.navigateBack('/hero-list');
  }
}
