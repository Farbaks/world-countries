import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  darkModeEnabled: boolean = false;
  constructor(public generalService: GeneralService) { }

  ngOnInit(): void {
  }

  checkMode() {
    this.generalService.isDarkModeEnabled().subscribe(
      (mode: boolean) => {
        this.darkModeEnabled = mode;
      }
    );

  }

}
