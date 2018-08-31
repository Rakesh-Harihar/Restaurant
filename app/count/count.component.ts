import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  count;
  today=new Date;
  date = this.today.getDate()+"/"+(this.today.getUTCMonth()+1)+"/"+this.today.getFullYear();
  post = { date:this.date };
  constructor(private dts:DataService,private auth:AuthGuard) {
    if(this.auth.canActivate() && localStorage.getItem("type")=="chef"){
      this.dts.getCount(this.post).subscribe(res=> {
        this.count=res.json();
        if(this.count.msg=="norecord")
          document.getElementById("nodata").innerHTML="no one has optedin or optedout still";
      });
    }
  }

  ngOnInit() {
  }

}
