import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { environment } from 'src/environments/environment';
import { UIService } from '../app/shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoot from './app.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(fromRoot.reducers),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
