import { Component, OnInit } from "@angular/core";
import { ApiService } from "app/services/api.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users;
  p;
  searchText;
  range = 30;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getCityUsers(this.range).then((result) => {
      this.users = result;
    });
  }

  delUser(id) {
    this.api.deleteUser(id).then((result) => {
      this.loadUsers();
    });
  }

  valueChanged(e) {
    this.range = e;
    this.loadUsers();
  }
}
