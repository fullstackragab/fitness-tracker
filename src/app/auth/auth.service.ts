import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { UIService } from '../shared/ui.service'
import { TrainingService } from '../training/training.service'
import { AuthData } from './auth-data.model'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from '../auth/auth.actions'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = {}
  constructor(
    private router: Router,
    // private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    // this.auth.authState.subscribe((user) => {
    //   if (user) {
    //     this.store.dispatch(new Auth.SetAuthenticated());
    //     // this.isAuthenticated = true;
    //     // this.authChange.next(true);
    //     this.router.navigate(['/training']);
    //     // localStorage.setItem('user', JSON.stringify(this.user));
    //     localStorage.setItem('isAuthenticated', true + '');
    //   } else {
    //     this.store.dispatch(new Auth.SetUnauthenticated());
    //     this.trainingService.cancelSubscriptions();
    //     // this.isAuthenticated = false;
    //     // this.authChange.next(null);
    //     this.router.navigate(['/login']);
    //     localStorage.removeItem('isAuthenticated');
    //   }
    // });
    this.getUser().subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated())
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training'])
        // localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isAuthenticated', true + '')
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.trainingService.cancelSubscriptions()
        // this.isAuthenticated = false;
        // this.authChange.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('isAuthenticated')
      }
    })
  }

  registerUser(authData: AuthData) {
    // // this.uiService.loadingStateChanged.next(true);
    // this.store.dispatch(new UI.StartLoading());
    // this.auth
    //   .createUserWithEmailAndPassword(authData.email, authData.password)
    //   .then((result) => {
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.store.dispatch(new UI.StopLoading());
    //   })
    //   .catch((error) => {
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.store.dispatch(new UI.StopLoading());
    //     this.uiService.showSnackBar(error.message, null, 3000);
    //   });
  }

  login(authData: AuthData) {
    this.user = {}
    // // this.uiService.loadingStateChanged.next(true);
    // this.store.dispatch(new UI.StartLoading());
    // this.auth
    //   .signInWithEmailAndPassword(authData.email, authData.password)
    //   .then((result) => {
    //     console.log('[LOGIN] ', result);
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.store.dispatch(new UI.StopLoading());
    //   })
    //   .catch((error) => {
    //     this.store.dispatch(new UI.StopLoading());
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.uiService.showSnackBar(error.message, null, 3000);
    //   });

    // // this.uiService.loadingStateChanged.next(true);
    // this.store.dispatch(new UI.StartLoading());
    // this.getUser().subscribe(
    //   (user) => {
    //     console.log('[LOGIN] ', user);
    //     this.store.dispatch(new Auth.SetAuthenticated());
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.store.dispatch(new UI.StopLoading());
    //   },
    //   (err) => {
    //     this.store.dispatch(new UI.StopLoading());
    //     // this.uiService.loadingStateChanged.next(false);
    //     this.uiService.showSnackBar(err.message, null, 3000);
    //   }
    // );

    this.store.dispatch(new UI.StartLoading())
    this.getUser().subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated())
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.router.navigate(['/training'])
        // localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isAuthenticated', true + '')
        this.store.dispatch(new UI.StopLoading())
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.trainingService.cancelSubscriptions()
        // this.isAuthenticated = false;
        // this.authChange.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('isAuthenticated')
        this.store.dispatch(new UI.StopLoading())
      }
    })
  }

  autoLogin() {
    // const userData = JSON.parse(localStorage.getItem('user'));
    // if (userData) {
    //   this.user = {
    //     email: userData.email,
    //     userId: userData.userId,
    //   };
    //   console.log('Auth Service ', true);
    //   this.isAuthenticated = true;
    //   this.authChange.next(true);
    // }
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))
    if (isAuthenticated) {
      this.store.dispatch(new Auth.SetAuthenticated())
    }
  }

  logout() {
    // // this.auth.signOut();
    // this.user = undefined;
    // this.store.dispatch(new Auth.SetUnauthenticated());

    this.user = undefined
    this.store.dispatch(new Auth.SetUnauthenticated())
    this.trainingService.cancelSubscriptions()
    // this.isAuthenticated = false;
    // this.authChange.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('isAuthenticated')
  }

  getUser(): Observable<{}> {
    return new Observable<{}>((observer) => {
      setTimeout(() => {
        observer.next(this.user)
      }, 1000)
    })
  }
}
