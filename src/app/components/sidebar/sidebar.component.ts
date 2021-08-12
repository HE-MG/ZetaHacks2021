import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/notifications",
    title: "Home",
    icon: "home",
    class: "",
  },
  { path: "/dashboard", title: "Dashboard", icon: "dashboard", class: "" },
  { path: "/user-profile", title: "User Profile", icon: "person", class: "" },
  {
    path: "/table-list",
    title: "Account Summary",
    icon: "paid",
    class: "",
  },
  {
    path: "/maps",
    title: "Investment Planner",
    icon: "trending_up",
    class: "",
  },
  {
    path: "/typography",
    title: "Learning Centre",
    icon: "library_books",
    class: "",
  },
  { path: "/icons", title: "Offers", icon: "savings", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
