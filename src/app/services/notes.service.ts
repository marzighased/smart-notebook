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

      const notes = parsedNotes.map((note: any) => ({...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }));
      this.notes.set(notes);
    }
  }

  updateNote(updatedNote: Note) {
  this.notes.update(notes => 
    notes.map(note => note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date() } : note));
  this.saveToLocalStorage();
  }

  deleteNote(id: string) {
  this.notes.update(notes => notes.filter(note => note.id !== id));
  this.saveToLocalStorage();
  }

  searchNotes(query: string) {
  if (!query.trim()) {
    return this.notes();
  }
  
  const lowerQuery = query.toLowerCase();
  return this.notes().filter(note => 
    note.title.toLowerCase().includes(lowerQuery) || 
    note.content.toLowerCase().includes(lowerQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))); 
  }

}