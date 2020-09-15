import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { person } from '../../../models/user.details';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.scss']
})
export class SecondFormComponent implements OnInit, OnDestroy {
  showSpinner:Boolean;
  userForm: FormGroup;
  personDetails: person;
  submitted = false;
  $unsubscribe = new Subject();
  basicData:any;
  residents:number;
  i = Array;
  currentItem:number = 0;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.basicData = this.apiService.getFirstData();
    if(this.basicData.source._value && (this.basicData.source._value.noOfPeople > 0)){
      this.residents = this.basicData.source._value.noOfPeople;
    }else{
      this.router.navigateByUrl('/');
    }
    
    this.showSpinner=false;
    
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sex:['']
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
      this.showSpinner=false;
      return;
    } else {
      if((this.currentItem + 1) < this.residents){
        this.currentItem = this.currentItem + 1;
      }
      
      this.personDetails = this.userForm.value;
      this.apiService.personalData(this.personDetails.firstName, this.personDetails.lastName, this.personDetails.sex);

      this.apiService.personalData(this.personDetails.firstName, this.personDetails.lastName, this.personDetails.sex)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(data => {
        this.showSpinner=false;
        console.log(data);
      });
    }
  }

  saveToSession(){
    console.log("save to session");
  }

}
