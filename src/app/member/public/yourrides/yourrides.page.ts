import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { YourridesService } from 'src/app/services/yourrides.service';
import { EnquiryModel } from 'src/app/models/enquiry.model';
import { Enquiry } from '../../../interfaces/Enquiry';

@Component({
  selector: 'app-yourrides',
  templateUrl: './yourrides.page.html',
  styleUrls: ['./yourrides.page.scss'],
})
export class YourridesPage implements OnInit {

  enqiry:EnquiryModel={picup_time:"",dropoff_location:"",email:"",fullname:"",mobile:"",picup_date:"",picup_location:"",vehicle_id:"",added_by:0,enq_status:""};
  userData;
  Rides: any = [];
  flag: any = 0;
  constructor(
    private authService: AuthenticationService, 
    private yourrides:YourridesService,
    private http: HttpClient, 
    private fb: FormBuilder,
    private yourRidesAPI: YourridesService,
    private zone: NgZone,
    private router: Router,) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('user'));
    console.log("localStorage",this.userData);
    this.enqiry.fullname=this.userData.fullname;
    this.enqiry.email=this.userData.email;
    this.enqiry.mobile=this.userData.mobile;
    console.log(this.userData.user_id);
    this.yourrides.getYourRides(this.userData.user_id).subscribe((res) => {
      console.log("Value in res",res);
      this.Rides = res;
      console.log(this.Rides);
  });
}
doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.yourrides.getYourRides(this.userData.user_id).subscribe((res) => {
      console.log("Value in res",res);
      this.Rides = res;
      console.log(this.Rides);
  });
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}



  logout(){
    localStorage.clear();
    localStorage.removeItem('user');
    this.authService.logout();
}


}
