import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactAdapterProvider, ReactAdapterService} from 'src/react/modules/adapter';
import {LoyaltyTransactions} from 'src/react/modules/loyalty/components/loyalty-transactions/loyalty-transactions';
import {BridgeComponent} from 'src/shared/interfaces/bridge-component.interface';

@Component({
  template: '<div #container></div>',
})
export class LoyaltyTransactionsComponent implements BridgeComponent {
  @ViewChild('container', {static: false}) wrapper: ElementRef<HTMLDivElement>;

  constructor(
    private adapterService: ReactAdapterService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.wrapper.nativeElement);
  }

  render() {
    if (this.wrapper && this.wrapper.nativeElement) {
      ReactDOM.render(
        <ReactAdapterProvider
          adapterService={this.adapterService}
          activatedRoute={this.activatedRoute}>
          <LoyaltyTransactions />
        </ReactAdapterProvider>,
        this.wrapper.nativeElement,
      );
    }
  }
}
