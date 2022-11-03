import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScopesBuilder } from "../shared/scopes-builder";
import { AuthConfig } from "../shared/spotify-auth-config.i";

@Component({})
export class LoginComponent implements OnInit {
  private requestAuthUrl = 'https://accounts.spotify.com/authorize';

  constructor() { }

  ngOnInit() {

  }

  public login(): void {
    this.authorize();
  }

  public authorize(){ 
    window.location.href = this.buildAuthUrl();
  }

  private buildAuthUrl(): string{

    let params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      if(typeof(value) == 'object'){
        params.push(`${key}=${(value as string[]).join(" ")}`);
      }else{
        params.push(`${key}=${value}`);
      }
    }

    return `${this.requestAuthUrl}?${params.join('&')}`;
  }

  private authConfig: AuthConfig = { 
    client_id: "665f9a1fab5a40268546431b12d337cb",  // WebPortal App Id. Shoud be config
    response_type: "token",
    redirect_uri: "http://localhost:3000/authorized",  // My URL
    state: "",
    show_dialog: true,
    scope: new ScopesBuilder().build()
  };
}
