import { Component, Inject } from '@angular/core';

import * as Common from 'ng-system-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-app';

  constructor(
    @Inject(Common.CommandRepositoryToken)
    private commandRepository: Common.ICommandRepository
  ) {
    this.commandRepository.Register(
      'myCommand',
      new Common.DelegateCommand(
        (params: any) => true,
        (params: any) => {
          this.sayHello();
        }
      )
    );
  }

  private sayHello(): void {
    console.log('Hello');
  }
}
