import { Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/new', component: NoteFormComponent },
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'notes/:id/edit', component: NoteFormComponent },
  { path: '**', redirectTo: 'notes' } 
];
