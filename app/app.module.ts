import { MenupageComponent } from './menupage/menupage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { EditmenuComponent } from './editmenu/editmenu.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CountComponent } from './count/count.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    MenupageComponent,
    EditmenuComponent,
    FeedbackComponent,
    CountComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginpageComponent },
      { path: 'homepage', component:HomepageComponent },
      { path: 'menupage', component:MenupageComponent },
      { path: 'editmenu', component:EditmenuComponent},
      { path: 'feedback', component:FeedbackComponent},
      { path: 'count', component:CountComponent},
      { path: '**', component:LoginpageComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
