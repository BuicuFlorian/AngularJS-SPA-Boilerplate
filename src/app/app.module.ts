import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthService } from './services/auth.service';
import { HttpWrapper } from './utilities/http-wrapper.service';
import { NotAuthGuard } from './guards/not-auth-guard';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        AccountSettingsComponent,
        PageNotFoundComponent
    ],
    providers: [
        AuthService,
        HttpWrapper,
        NotAuthGuard,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
