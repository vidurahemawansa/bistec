import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userData } from '../../../models/user.details';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.scss']
})
export class FirstFormComponent implements OnInit, OnDestroy {
  showSpinner:Boolean;
  userForm: FormGroup;
  userDetails: userData;
  submitted = false;
  $unsubscribe = new Subject();

  constructor(private formBuilder:FormBuilder, private apiService:ApiService) { }

  ngOnInit(): void {
    this.showSpinner=false;
    this.userForm = this.formBuilder.group({
      noOfPeople: ['', Validators.required],
      otherPeople: [''],
      ownedBy: [''],
      telephone: ['']
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  // assing values to form data
  get userData() { return this.userForm.controls; }

  submitForm() {
    this.showSpinner=true;
    this.submitted = true;
    // stop if the form not validated
    if (this.userForm.invalid) {
      return;
    } else {
      this.userDetails = this.userForm.value;
      this.apiService.setFirstData(this.userDetails);
    }
  }

  saveToSession(){
    console.log("save to session");
  }

}
