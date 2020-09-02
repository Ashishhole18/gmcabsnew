import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { LocalenquiryService } from 'src/app/services/localenquiry.service';
import { EnquiryModel } from 'src/app/models/enquiry.model';


@Component({
  selector: 'app-local',
  templateUrl: './local.page.html',
  styleUrls: ['./local.page.scss'],
})
export class LocalPage implements OnInit {
  spinner=false;
  Locals: any = [];
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  enqiry:EnquiryModel={picup_time:"",dropoff_location:"",email:"",fullname:"",mobile:"",picup_date:"",picup_location:"",vehicle_id:"",added_by:0,enq_status:"1"};
  localForm: FormGroup;
  userData;
  constructor(
    private localenquiryService: LocalenquiryService, 
    private http: HttpClient, 
    private fb: FormBuilder,
    private localenquiryAPI: LocalenquiryService,
    private zone: NgZone,
    private router: Router,
    
    ) {
    
      this.localForm = this.fb.group({
        picup_location: [''],
        dropoff_location: [''],
        picup_date: [''],
        picup_time: [''],
        vehicle_id: [''],
    })
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }
  ngOnInit() {


    this.userData=JSON.parse(localStorage.getItem('user'))
    console.log(this.userData);
    this.enqiry.fullname=this.userData.fullname;
    this.enqiry.email=this.userData.email;
    this.enqiry.mobile=this.userData.mobile;
    this.enqiry.added_by=this.userData.user_id;
    this.localenquiryService.getLocal().subscribe((res) => {
      console.log(res)
      this.Locals = res;
      console.log("Local Response",this.Locals);
      
    })
  }

  

  onFormSubmit() {
    this.spinner=true;

    if (!this.localForm.valid) {
      return false;
    } else {
      
      this.localenquiryAPI.newEnquiry(this.enqiry).subscribe(
        result=>{
          console.log(result);
          this.localForm.reset();
          if(result)
          {
            this.spinner=false;
          }
          
        },err=>
        {
          console.log(err);
          
        }
      )
    }
   console.log(this.enqiry);
   
  }
}
