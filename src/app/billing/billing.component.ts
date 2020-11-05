import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { ApiService } from "app/services/api.service";
import { ToastrService } from "ngx-toastr";
const Chart = require("chart.js");

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.css"],
})
export class BillingComponent implements OnInit {
  assoc;
  user;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchUser();
  }

  switchAssoc(assoc) {
    this.assoc = assoc.value;
    this.api.updateUserAsso(assoc.value).then(result => {
      this.fetchUser();
    })
  }

  fetchUser() {
    this.api.getUsers().then((data) => {
      this.user = data;
    });
  }
}
