import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TacheService } from '../tache.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-tache-edit',
  templateUrl: './tache-edit.component.html',
  styleUrls: ['./tache-edit.component.scss']
})
export class TacheEditComponent implements OnInit {

  tacheForm: FormGroup;
  id = '';
  titre = '';
  dateExecution = null;
  description: '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: TacheService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTache(this.route.snapshot.params['id']);
    this.tacheForm = this.formBuilder.group({
      'titre' : [null, Validators.required],
      'dateExecution' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  getTache(id: any) {
    this.api.getTache(id).subscribe((data: any) => {
      this.id = data.id;
      this.tacheForm.setValue({
        titre: data.titre,
        dateExecution: data.dateExecution,
        description: data.description
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateTache(this.id, this.tacheForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/tache-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  tacheDetails() {
    this.router.navigate(['/tache-details', this.id]);
  }

}