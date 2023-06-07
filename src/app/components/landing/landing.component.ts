import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/components/layout/service/app.layout.service';
import { OsmFacade } from "../osm/osm.facade";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    public layoutService: LayoutService,
    public router: Router,
  ) {}

  ngOnInit() {
    // Initialization logic here
  }
}
