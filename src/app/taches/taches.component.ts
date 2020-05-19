import { Component, OnInit } from '@angular/core';
import { TacheService } from '../tache.service';
import { Tache } from '../tache';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {

  displayedColumns: string[] = ['titre', 'date_execution', 'description'];
  data: Tache[] = [];
  isLoadingResults = true;

  constructor(private api: TacheService) { }

  ngOnInit() {
    this.api.getTaches()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
