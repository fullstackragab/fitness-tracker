import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExersices() {
    this.uiService.loadingStateChanged.next(true);

    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((result) => {
            return result.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as {
                  name: string;
                  duration: number;
                  calories: number;
                }),
              };
            });
            // throw new Error('Failed fetching exercises!');
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          },
          (error) => {
            this.uiService.loadingStateChanged.next(false);
          }
        )
    );
  }

  startTraining(id: string) {
    this.store.dispatch(new Training.StartTraining(id));

    // this.db.doc('availableExercises/'+id).update({
    //   lastSelected: new Date()
    // });
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe((ex) => {
        const exercise: Exercise = {
          ...ex,
          date: new Date().getTime(),
          state: 'completed',
        };
        this.addDataToDatabase(exercise);
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe((ex) => {
        const exercise: Exercise = {
          ...ex,
          duration: (ex.duration * progress) / 100,
          calories: (ex.calories * progress) / 100,
          date: new Date().getTime(),
          state: 'cancelled',
        };
        this.addDataToDatabase(exercise);
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.uiService.loadingStateChanged.next(true);

    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
