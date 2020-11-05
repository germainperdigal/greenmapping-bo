import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { ApiService } from "app/services/api.service";
import { ToastrService } from "ngx-toastr";
const Chart = require("chart.js");

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  userCount = 0;
  pinCount = 0;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadCityUsers();
    this.loadPin();
    const testChart = new Chart(document.getElementById("userChart"), {
      type: "bar",
      data: {
        labels: ["10/29", "10/30", "10/31", "11/01", "11/02", "11/03"],
        datasets: [
          {
            label: "Number of users",
            data: [1, 3, 8, 12, 18, 43],
            backgroundColor: [
              "rgba(0, 135, 1, 0.33)",
              "rgba(0, 135, 1, 0.33)",
              "rgba(0, 135, 1, 0.33)",
              "rgba(0, 135, 1, 0.33)",
              "rgba(0, 135, 1, 0.33)",
              "rgba(0, 135, 1, 0.33)",
            ],
            borderColor: [
              "rgba(0, 135, 1, 1)",
              "rgba(0, 135, 1, 1)",
              "rgba(0, 135, 1, 1)",
              "rgba(0, 135, 1, 1)",
              "rgba(0, 135, 1, 1)",
              "rgba(0, 135, 1, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const ideasChart = new Chart(document.getElementById("ideasChart"), {
      type: "line",
      data: {
        labels: ["10/29", "10/30", "10/31", "11/01", "11/02", "11/03"],
        datasets: [
          {
            label: "Ideas per day",
            data: [12, 25, 8, 1, 7, 6],
            fill: true,
            borderColor: "#008701",
            backgroundColor: "rgba(0, 135, 1, 0.33)",
          },
        ],
      },
    });
  }

  loadCityUsers() {
    this.api.getCityUsers(40).then((users: any) => {
      this.userCount = users.length;
    });
  }

  loadPin() {
    this.api.loadIdeas(40).then((pin: any) => {
      this.pinCount = pin.length;
    });
  }
}
