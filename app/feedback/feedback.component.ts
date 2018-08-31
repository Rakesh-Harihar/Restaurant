import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  expe="";
  data={};
  constructor(private dts:DataService, private rts:Router,private auth:AuthGuard) {
    if(this.auth.canActivate() && localStorage.getItem("type")=="employee"){
      
    }
    else{
      window.history.back();
    }
   }

  ngOnInit() {
  }
  post(msg,user,email){
    this.data={radio:this.expe, msg:msg, user:user, email:email}
    this.dts.feedback(this.data).subscribe();
    localStorage.clear();
    this.rts.navigate([''])
  }

  radios(exp){
      this.expe=exp;
  }
}
