import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  private notes = signal<Note[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  getNotes() {
    return this.notes;
  }

  addNote(title: string, content: string, tags: string[]) {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.notes.update(notes => [...notes, newNote]);
    this.saveToLocalStorage();
    
    return newNote;
  }

  private saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes()));
  }

  private loadFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);

      const notes = parsedNotes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }));
      this.notes.set(notes);
    }
  }
}