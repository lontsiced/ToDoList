import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-tache-add',
  templateUrl: './tache-add.component.html',
  styleUrls: ['./tache-add.component.css']
})
export class TacheAddComponent implements OnInit {

  tacheForm: FormGroup;
  titre = '';
  dateExecution = null;
  description: '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: TacheService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tacheForm = this.formBuilder.group({
      'titre' : [null, Validators.required],
      'dateExecution' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addTache(this.tacheForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/tache-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
