import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userData } from '../../../models/user.details';
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
  userDetails: userData;
  submitted = false;
  $unsubscribe = new Subject();
  basicData:any;
  residents:number;
  i = Array;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService) { }

  ngOnInit(): void {
    this.basicData = this.apiService.getFirstData();
    if(this.basicData.source._value && (this.basicData.source._value.noOfPeople > 0)){
      this.residents = this.basicData.source._value.noOfPeople;
    }else{
      this.residents = 3; //TODO
    }
    
    this.showSpinner=false;
    
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
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
