import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './training.actions';
import * as fromRoot from '../app.reducer';
import { Exercise } from './exercise.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableTrainings: Exercise[];
  finishedTrainings: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableTrainings: ([] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ]),
  finishedTrainings: [
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8,
      date: 1608926410497,
      state: 'completed',
    },
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8,
      date: 1608926450497,
      state: 'completed',
    },
    {
      id: 'touch-toes',
      name: 'Touch Toes',
      duration: 180,
      calories: 15,
      date: 1608936510497,
      state: 'completed',
    },
    {
      id: 'touch-toes',
      name: 'Touch Toes',
      duration: 18,
      calories: 0.15,
      date: 1608929510497,
      state: 'cancelled',
    },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 3.6,
      calories: 0.54,
      date: 1608926847312,
      state: 'cancelled',
    },
    {
      id: 'burpees',
      name: 'Burpees',
      duration: 6.6,
      calories: 0.88,
      date: 1608926917780,
      state: 'cancelled',
    },
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8,
      date: 1608926410497,
      state: 'completed',
    },
  ],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableTrainings: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedTrainings: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableTrainings.find((ex) => ex.id === action.payload),
        },
      };
    case STOP_TRAINING:
      const updatedFinishedTrainings = [...state.finishedTrainings];
      updatedFinishedTrainings.push(action.payload);
      return {
        ...state,
        activeTraining: null,
        finishedTrainings: updatedFinishedTrainings,
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>(
  'training'
);

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableTrainings
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedTrainings
);
export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
