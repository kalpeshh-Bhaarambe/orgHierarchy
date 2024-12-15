import { Component, input, output } from '@angular/core';
import { ClarityIcons, tableIcon, usersIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { SharedConstants } from '../../../shared/constants/shared.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public selectedView = input<string>();
  public viewChange = output<string>();
  public views = SharedConstants.view;

  constructor() {
    ClarityIcons.addIcons(tableIcon, usersIcon);
  }

  changeView = (view: string) => this.viewChange.emit(view);
}
