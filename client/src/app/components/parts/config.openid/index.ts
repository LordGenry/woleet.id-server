import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ServerConfigService as ConfigService } from '@services/server-config';
import { ErrorMessageProvider, secureUrlValidator } from '@components/util';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'config-openid',
  templateUrl: './index.html'
})
export class ConfigOpenIDComponent extends ErrorMessageProvider implements OnInit, OnDestroy {

  formLocked$: Observable<boolean>;
  formValid$: BehaviorSubject<boolean>;
  useOpenIDConnect$: BehaviorSubject<boolean>;

  config$: Observable<ApiServerConfig>;

  form: FormGroup;
  _useOpenIDConnect: boolean;
  reveal = false;
  changed = false;

  private onDestroy: EventEmitter<void>;

  constructor(private configService: ConfigService) {
    super();
    this.onDestroy = new EventEmitter();
  }

  ngOnInit() {
    this.form = new FormGroup({
      openIDConnectURL: new FormControl({ value: '', }, [secureUrlValidator]),
      openIDConnectClientId: new FormControl({ value: '' }, [Validators.minLength(1)]),
      openIDConnectClientSecret: new FormControl({ value: '' }, [Validators.minLength(1)]),
      openIDConnectClientRedirectURL: new FormControl({ value: '' }, [secureUrlValidator])
    });

    const config$ = this.config$ = this.configService.getConfig();

    this.formLocked$ = this.configService.isDoingSomething();
    this.useOpenIDConnect$ = new BehaviorSubject(true);
    this.formValid$ = new BehaviorSubject(false);

    this.registerSubscription(config$.subscribe((config) => {
      if (!config) {
        return;
      }

      const url = `${window.location.origin}/oauth/callback`;

      this.useOpenIDConnect$.next(config.useOpenIDConnect);

      this.form.get('openIDConnectURL').setValue(config.openIDConnectURL || '');
      this.form.get('openIDConnectClientId').setValue(config.openIDConnectClientId || '');
      this.form.get('openIDConnectClientSecret').setValue(config.openIDConnectClientSecret || '');
      this.form.get('openIDConnectClientRedirectURL').setValue(config.openIDConnectClientRedirectURL || url);

      this.changed = false;
      this.formValid$.next(this.isFormValid());
    }));


    this.registerSubscription(this.formLocked$.subscribe((locked) => {
      if (locked) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }));

  }

  registerSubscription(sub: Subscription) {
    this.onDestroy.subscribe(() => sub.unsubscribe());
  }

  ngOnDestroy() {
    this.onDestroy.emit();
  }

  update() {
    const openIDConnectURL = this.form.get('openIDConnectURL').value || null;
    const openIDConnectClientId = this.form.get('openIDConnectClientId').value || null;
    const openIDConnectClientSecret = this.form.get('openIDConnectClientSecret').value || null;
    const openIDConnectClientRedirectURL = this.form.get('openIDConnectClientRedirectURL').value || null;
    const useOpenIDConnect = this._useOpenIDConnect;
    this.configService.update({
      openIDConnectURL,
      useOpenIDConnect,
      openIDConnectClientId,
      openIDConnectClientSecret,
      openIDConnectClientRedirectURL
    });
  }

  updateUseOpenIDConnectOption(useOpenIDConnect) {
    this._useOpenIDConnect = useOpenIDConnect;
    this.useOpenIDConnect$.next(useOpenIDConnect);
    this.formValid$.next(this.isFormValid());
    this.changed = true;
  }

  isFormValid() {
    return this.form.valid && Object.values(this.form.value).every(e => !!e);
  }

  change() {
    this.changed = true;
    this.formValid$.next(this.isFormValid());
  }

}
