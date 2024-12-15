import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GraphViewComponent } from './components/home/graph-view/graph-view.component';
import { GridViewComponent } from './components/home/grid-view/grid-view.component';

const pathMatch: 'full' | 'prefix' = 'full';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'graph/:id', component: GraphViewComponent },
      { path: 'graph', component: GraphViewComponent },
      { path: 'grid', component: GridViewComponent },
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: pathMatch },
];
