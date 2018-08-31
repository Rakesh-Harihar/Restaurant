import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-editmenu',
  templateUrl: './editmenu.component.html',
  styleUrls: ['./editmenu.component.css']
})
export class EditmenuComponent implements OnInit {
  data=[];
  post={};
  response;
  constructor(private dts:DataService,private auth:AuthGuard ) {
    if(this.auth.canActivate() && localStorage.getItem("type")=="chef")
      this.dts.getMainMenu().subscribe(res =>this.data = res.json());
    else{
      window.history.back();
    }
  }

  ngOnInit() {
  }
  poster(da){
    console.log(da.value);
    this.post={item_name:da.value};
    console.log(this.post);
    da.value="";
    
    this.dts.addToMainMenu(this.post).subscribe(res=>{
      this.response = res.json();
    });
    location.reload();
  }


}
