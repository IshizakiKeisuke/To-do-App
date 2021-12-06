import { Component, Inject } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loginDisplay = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
               
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) { //引数が使用される理由が分からないので一旦放置、動作が確認できたら引数を削除してテストしてみること
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest); //引数が二つではなく、RedirectRequest１つ ...aでaをコピーしている。
      } else {    //これいらない(authRequestをapp.module.tsで定義してるから)
       // this.authService.loginRedirect(userFlowRequest);
      }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void { //ライブラリ使用がRxJS
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
