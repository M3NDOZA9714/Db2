import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Db2';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove(...Array.from(document.body.classList));
        if (event.urlAfterRedirects.includes("main")) {
          document.body.classList.add(...Array.from(["hold-transition", "sidebar-mini", "layout-fixed", "layout-navbar-fixed", "text-sm", "sidebar-collapse"]));
        } else if (event.urlAfterRedirects.includes("login")) {
          document.body.classList.add(...Array.from(["hold-transition", "login-page"]));
        }
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        console.log("NavigationError:", event)
      }
    })
  }
}
