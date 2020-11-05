import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //apiBaseUrl = "http://localhost:4321/";
  apiBaseUrl = "https://greenmapping.herokuapp.com/";
  token: string = "Bearer ";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loadIdeas(range) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiBaseUrl + "pin/" + range, options).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          this.toastr.error("Error loading pins !");
        }
      );
    });
  }

  getUsers() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiBaseUrl + "user/user", options).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          this.toastr.error("Error loading pins !");
        }
      );
    });
  }

  updateUserAsso(asso) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient
        .patch(
          this.apiBaseUrl + "user/association",
          { association: asso },
          options
        )
        .subscribe(
          (data) => {
            resolve(data);
            this.toastr.success(String(data));
          },
          (err) => {
            console.log(err);
            this.toastr.error("Error while setting association !");
          }
        );
    });
  }

  deleteUser(id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.apiBaseUrl + "user/" + id, options).subscribe(
        (data) => {
          resolve(data);
          this.toastr.success(String(data));
        },
        (err) => {
          console.log(err);
          this.toastr.error("Error while deleting this user !");
        }
      );
    });
  }

  deletePin(id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient.delete(this.apiBaseUrl + "pin/" + id, options).subscribe(
        (data) => {
          resolve(data);
          this.toastr.success(String(data));
        },
        (err) => {
          console.log(err);
          this.toastr.error("Error while deleting this pin !");
        }
      );
    });
  }

  getCityUsers(range) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("adminToken"),
    });
    let options = { headers: headers };
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.apiBaseUrl + "user/city/" + (range ? range : ""), options)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            this.toastr.error("Loading failed !");
          }
        );
    });
  }

  loginUser(username, password) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };
    var postData = { username, password };
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.apiBaseUrl + "user/login", postData, options)
        .subscribe(
          (data: any) => {
            if (data.role === "administrative") {
              this.token += data["token"];
              localStorage.setItem("adminToken", this.token);
              this.router.navigateByUrl("/dashboard");
              this.toastr.success("Welcome !");
            } else {
              this.toastr.error("Forbidden !");
            }
            resolve(data);
          },
          (err) => {
            this.toastr.error("Error thrown during login !");
          }
        );
    });
  }
}
