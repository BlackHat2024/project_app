import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode=true;
  isLoading=false;
  error:string=null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
  
  private closeSub:Subscription;

  constructor(private authService:AuthService, private router:Router, private componentFactoryResolver: ComponentFactoryResolver, private store:Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.store.select('auth').subscribe(authState=>{
      this.isLoading=authState.loading;
      this.error=authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form: NgForm){
    const email=form.value.email;
    const password=form.value.password;
    let authObs:Observable<AuthResponseData>;
    if(this.isLoginMode){
      // authObs=this.authService.logIn(email,password);
      this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}))
    }else{
      this.isLoading=true;
      authObs=this.authService.signup(email,password);
    }

    

      // authObs.subscribe(resData=>{
      //   console.log(resData);
      //   this.isLoading=false;
      //   this.router.navigate(['/recipes'])
      // },errorMessage=>{
      //   console.log(errorMessage);
      //   this.error=errorMessage;
      //   this.showErrorAlert(errorMessage);
      //   this.isLoading=false;
      // });
      form.reset();
    }
    

    onHandleError(){
      this.error=null;
    }


    private showErrorAlert(message:string){
      //const alertCmp=new AlertComponent();
      const alertCmpFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef=this.alertHost.veiewContainerRef;
      hostViewContainerRef.clear();
      const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
      componentRef.instance.message=message;
      this.closeSub=componentRef.instance.close.subscribe(()=>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
    }

    ngOnDestroy(): void {
        if(this.closeSub){
          this.closeSub.unsubscribe();
        }
    }

}
