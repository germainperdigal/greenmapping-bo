import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'home', class: '' },
    { path: '/users', title: 'Users',  icon: 'person', class: '' },
    { path: '/pins', title: 'Ideas',  icon: 'where_to_vote', class: '' },
    { path: '/billing', title: 'Billing',  icon: 'receipt_long', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem("adminToken");
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
