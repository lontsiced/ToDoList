import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../tache.service';
import { Tache } from '../tache';

@Component({
  selector: 'app-tache-detail',
  templateUrl: './tache-detail.component.html',
  styleUrls: ['./tache-detail.component.css']
})
export class TacheDetailComponent implements OnInit {

  tache: Tache = { id: null, titre: '', dateExecution: null, description: ''};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: TacheService, private router: Router) { }

  ngOnInit() {
    this.getTacheDetails(this.route.snapshot.params['id']);
  }

  getTacheDetails(id: any) {
    this.api.getTache(id)
      .subscribe((data: any) => {
        this.tache = data;
        console.log(this.tache);
        this.isLoadingResults = false;
      });
  }

  deleteTache(id: any) {
    this.isLoadingResults = true;
    this.api.deleteTache(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/taches']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
