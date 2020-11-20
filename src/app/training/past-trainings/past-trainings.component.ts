import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import { TrainingService } from '../training.service';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  dataSource = new MatTableDataSource<Exercise>();

  //---------------
  exercises = [];
  //---------------

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
        this.exercises = exercises;
      });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDateOfTimestamp(timestamp: number) {
    return new Date(timestamp);
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
