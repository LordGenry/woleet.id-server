import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ServerConfigService as ConfigService } from '@services/server-config';
import { ErrorMessageProvider, urlValidator, endValidator } from '@components/util';
import { Observable } from 'rxjs';
import * as log from 'loglevel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'config-identity-url',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ConfigIdentityUrlComponent extends ErrorMessageProvider implements OnInit, OnDestroy {

  editMode = false;

  formLocked$: Observable<boolean>;

  config$: Observable<ApiServerConfig>;

  form: FormControl;

  private onDestroy: EventEmitter<void>;

  constructor(private configService: ConfigService) {
    super();
    this.onDestroy = new EventEmitter();
  }

  ngOnInit() {
    this.form = new FormControl('', [urlValidator]);

    const config$ = this.config$ = this.configService.getConfig();

    this.formLocked$ = this.configService.isDoingSomething();

    const subscription = config$.subscribe((config) => {
      if (!config) {
        return;
      }

      this.editMode = false;
      this.form.setValue(config.identityURL);
    });

    this.onDestroy.subscribe(() => log.debug('Unsuscribe', subscription.unsubscribe()));
  }

  ngOnDestroy() {
    log.debug('unsubscribing');
    this.onDestroy.emit();
  }

  async submit() {
    const identityURL = this.form.value;
    log.debug('Set idnetity URL to', identityURL);
    this.configService.update({ identityURL });
  }

  cancelEdit() {
    this.editMode = false;
  }

}
