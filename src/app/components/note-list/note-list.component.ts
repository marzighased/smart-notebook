import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  private notesService = inject(NotesService); 
  notes = this.notesService.getNotes(); 

  deleteNote(id: string, event: Event) {
  event.stopPropagation();
  if (confirm('Are you sure you want to delete this note?')) {
    this.notesService.deleteNote(id);
  }
}
}