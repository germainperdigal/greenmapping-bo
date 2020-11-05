import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Router } from '@angular/router';
import 'rxjs/add/observable/interval';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
declare var global: any;
declare var require: any;
var geocoder = require('geocoder-fr');

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {

  ideas;
  sub;
  searchText;
  range = 30;

  constructor(private api: ApiService, public router: Router) { }

  ngOnInit() {
    this.loadIdeas();
  }

  loadIdeas() {
    this.api.loadIdeas(this.range).then((result:any) => {
      this.ideas = result;
      this.ideas.forEach(pin => {
        geocoder.reverse(pin.location.coordinates[0], pin.location.coordinates[1]).then((coords)=> pin.address = (coords.features[0].properties.label));
      });
    });
  }

  deletePin(id) {
    this.api.deletePin(id).then(deleted => {
      this.loadIdeas();
    })
  }

  valueChanged(e) {
    this.range = e;
    this.loadIdeas();
  }
}
