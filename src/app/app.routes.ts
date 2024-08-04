import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CsvImportComponent } from './csv-import/csv-import.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'csv-import', component: CsvImportComponent }
];
