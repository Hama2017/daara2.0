import { AfterViewInit, Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit(): void {

    this.initializeLoadingPage();
    this.initializeFullScreenButton();


  }

  private initializeLoadingPage(): void {

    $(window).on("load", function (e) {
      $("#global-loader").fadeOut("slow");
    });

  }
  private initializeFullScreenButton(): void {
    $(document).on('click', '.fullscreen-button', function () {
      if (!document.fullscreenElement) {
        const docEl = document.documentElement as any;

        if (docEl.requestFullscreen) {
          docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) { // Firefox
          docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) { // Chrome, Safari and Opera
          docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) { // IE/Edge
          docEl.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

}
