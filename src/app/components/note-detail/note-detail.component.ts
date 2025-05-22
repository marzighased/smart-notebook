import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notesService = inject(NotesService);
  
  note: Note | undefined;
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const notes = this.notesService.getNotes()();
        this.note = notes.find(note => note.id === id);
        
        if (!this.note) {
          this.router.navigate(['/notes']);
        }
      }
    });
  }
  
  deleteNote() {
    if (this.note && confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(this.note.id);
      this.router.navigate(['/notes']);
    }
  }
}