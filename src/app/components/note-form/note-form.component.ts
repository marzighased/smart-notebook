import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})

export class NoteFormComponent {
  private fb = inject(FormBuilder);
  private notesService = inject(NotesService);
  private router = inject(Router);
  
  noteForm: FormGroup;
  tagInput = '';
  
  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
      tags: [[]]
    });
  }
  
  addTag() {
    if (this.tagInput.trim()) {
      const currentTags = this.noteForm.get('tags')?.value || [];
      if (!currentTags.includes(this.tagInput.trim())) {
        this.noteForm.get('tags')?.setValue([...currentTags, this.tagInput.trim()]);
      }
      this.tagInput = '';
    }
  }
  
  removeTag(tagToRemove: string) {
    const currentTags = this.noteForm.get('tags')?.value || [];
    this.noteForm.get('tags')?.setValue(
      currentTags.filter((tag: string) => tag !== tagToRemove)
    );
  }
  
  onSubmit() {
    if (this.noteForm.valid) {
      const { title, content, tags } = this.noteForm.value;
      
      const newNote = this.notesService.addNote(title, content, tags);
      this.router.navigate(['/notes']);
    }
  }
}