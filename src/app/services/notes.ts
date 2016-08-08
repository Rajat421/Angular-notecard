import { Injectable } from '@angular/core';
import { ApiService } from './api';
import 'rxjs/Rx';
import {StoreHelper} from './stores-helper'

@Injectable()
export class NoteService {
  path: string = '/notes';
  constructor(private apiService: ApiService,
  private storehelper :StoreHelper) {}

  createNote(note) {
    return this.apiService.post(this.path, note)
        .do(saveNote => this.storehelper.add('notes',saveNote))
  }

  getNotes() {
    return this.apiService.get(this.path)
        .do(res => this.storehelper.update('notes',res.data))
  }

  completeNote(note) {
    return this.apiService.delete(`${this.path}/${note.id}`)
        .do(res => this.storehelper.findAndDelete('notes',res.id))
  }
}
