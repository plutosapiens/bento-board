import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private firestore: Firestore) {}

  getBoards(companyId: string): Observable<Board[]> {
    const boardsCollection = collection(this.firestore, 'boards');
    const q = query(boardsCollection, where('companyId', '==', companyId));
    return collectionData(q, { idField: 'boardId' }) as Observable<Board[]>;
  }

}


