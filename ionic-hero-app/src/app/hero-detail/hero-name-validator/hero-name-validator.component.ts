import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-name-validator',
  templateUrl: './hero-name-validator.component.html',
  styleUrls: ['./hero-name-validator.component.scss']
})
export class HeroNameValidatorComponent implements OnInit {
  private mHeroName: string = String.Empty();
  private mIsError: boolean = false;
  private mMessage: string = String.Empty();

  private mNameEmpty: boolean = false;
  private mNameStartWithNumber: boolean = false;
  private mNameContainsSpecial: boolean = false;

  private NumberItems: Array<string> = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ];
  private InvalidItems: Array<string> = [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '+'
  ];

  constructor() {}

  @Input() set HeroName(value: string) {
    this.mHeroName = value;
    this.mIsError = !this.IsHeroNameValid();

    this.mMessage = this.mIsError ? this.GenerateMessage() : String.Empty();
  }

  get IsError(): boolean {
    return this.mIsError;
  }

  get Message(): string {
    return this.mMessage;
  }

  ngOnInit() {}

  private IsHeroNameValid(): boolean {
    this.mNameEmpty = String.IsNullOrEmpty(this.mHeroName);
    let firstCharactor = this.mHeroName.SubString(0, 1);
    this.mNameStartWithNumber = this.NumberItems.Contains(
      firstCharactor,
      true
    );
    let charactorItems = this.mHeroName.split(String.Empty());
    for (let charactorItem of charactorItems) {
      this.mNameContainsSpecial = this.InvalidItems.Contains(
        charactorItem,
        true
      );
      if (this.mNameContainsSpecial) {
        break;
      }
    }
    return (
      !this.mNameEmpty &&
      !this.mNameStartWithNumber &&
      !this.mNameContainsSpecial
    );
  }

  private GenerateMessage(): string {
    let message = String.Empty();
    
    if (this.mNameEmpty) {
      message = `Hero's name cannot be empty`;
    }

    if (this.mNameStartWithNumber) {
      message = `Hero's name cannot start with number`;
    }

    if (this.mNameContainsSpecial) {
      message = `Hero's name cannot contain special charactor`;
    }

    return message;
  }
}
