import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_local_storage_key } from 'src/app/constants/keys';
import { UiService } from 'src/app/helper/ui.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submit : boolean = false
  form : FormGroup
  error : any
  constructor(private _authService : AuthService, private _uiService : UiService,
      private _route : Router) {
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required]),
      password : new FormControl(null, [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  onSubmit() : void {
    if(!this.form.valid) return;

    this.onLogin;this.onLogin();
  }

  onLogin() : void {
    this.submit = true;
    this.error = null;
    const data = this.form.value;
    // console.log(data)
    this._authService.login(data)
    .subscribe((res) => {
      console.log(res)
      this.submit = false
      localStorage.setItem(user_local_storage_key, JSON.stringify(res));
      this._uiService.burgerShow(true);
      this._uiService.profileSectionToggle(true)
      this._route.navigateByUrl('/merchant')
    }, (err) => {

      // this.error = err?.error['message'];
      this.error = err.error.message;
      // console.log(this.error.error['message'])
      this.submit = false
    })
  }
}
