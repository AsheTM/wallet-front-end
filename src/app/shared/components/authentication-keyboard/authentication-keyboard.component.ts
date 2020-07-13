import { Component, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SharedModuleConfigServicesSessionsPassword } from '../../shared.type';
import { WALLET_SERVICES_SESSION_PASSWORD } from '../../shared.provider';


@Component({
  selector: 'ashetm-authentication-keyboard',
  templateUrl: './authentication-keyboard.component.html',
  styleUrls: ['./authentication-keyboard.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationKeyboardComponent {

  @Output() onPassword: EventEmitter<string> = new EventEmitter<string>();

  readonly DELETE:  string = "Delete";
  readonly keys$: Observable<string[]> = of(
    [
      "7",  "8",  "9",
      "4",  "5",  "6",
      "1",  "2",  "3",
      this.DELETE,  "0",  ""
    ]
  );
  private readonly PASSWORD_LENGTH: number = 4;// this.sharedModuleConfigServicesSessionsPassword.length;

  private pinCode: string = '';

  // constructor(@Inject(WALLET_SERVICES_SESSION_PASSWORD)
  //   private sharedModuleConfigServicesSessionsPassword: SharedModuleConfigServicesSessionsPassword) { }

  onPasswordClickEventHandler(key: string): void {
    switch(true) {
      case key === this.DELETE:
        this.pinCode = '';
        break;
      case this.pinCode.length >= this.PASSWORD_LENGTH:
        this.pinCode = '';
      default:
        this.pinCode += key;
    }
    this.onPassword.emit(this.pinCode);
  }

}
