import 'ng-system-common';

export class Hero {
  constructor(id: string, name: string, power: string) {
    this.Id = id;
    this.Name = name;
    this.Power = power;
  }
  Id: string = String.Empty();
  Name: string = String.Empty();
  Power: string = String.Empty();
}
