import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registration!: FormGroup;

  constructor(private fb:FormBuilder){
  }
  ngOnInit(){
  this.registration = this.fb.group({
  firstName:['',Validators.required],
  lastName:[''],
  birthdayDate:[''],
  inlineRadioOptions:['',Validators.required],
  emailAddress:[''],
  phoneNumber:[''],
  subject:[''],
})
  }

  onSubmit(){
   console.log(this.registration.value);
  }
  onClear(){
    this.registration.reset();
  }

}
