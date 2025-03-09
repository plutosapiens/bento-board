import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where, collectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { Comment } from '../models/comment.model';
import { File } from '../models/file.model';
import { TicketHistory } from '../models/ticket-history.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private firestore: Firestore) { }

  getTickets(boardId: string): Observable<Ticket[]> {
    const ticketsCollection = collection(this.firestore, 'tickets');
    const q = query(ticketsCollection, where('boardId', '==', boardId));
    return collectionData(q, { idField: 'ticketId' }) as Observable<Ticket[]>;
  }

  getTicket(ticketId: string): Observable<Ticket | undefined> {
    const ticketDoc = doc(this.firestore, 'tickets', ticketId);
    return docData(ticketDoc, { idField: 'ticketId' }) as Observable<Ticket | undefined>;
  }

  addTicket(ticket: Ticket): Promise<any> {
    const ticketsCollection = collection(this.firestore, 'tickets');
    return addDoc(ticketsCollection, ticket);
  }

  updateTicket(ticket: Ticket): Promise<void> {
    const ticketDoc = doc(this.firestore, 'tickets', ticket.ticketId!);
    return updateDoc(ticketDoc, { ...ticket });
  }

  deleteTicket(ticketId: string): Promise<void> {
    const ticketDoc = doc(this.firestore, 'tickets', ticketId);
    return deleteDoc(ticketDoc);
  }

  // Comments
  getComments(ticketId: string): Observable<Comment[]> {
    const commentsCollection = collection(this.firestore, `tickets/${ticketId}/comments`);
    return collectionData(commentsCollection, { idField: 'commentId' }) as Observable<Comment[]>;
  }

  addComment(ticketId: string, comment: Comment): Promise<any> {
    const commentsCollection = collection(this.firestore, `tickets/${ticketId}/comments`);
    return addDoc(commentsCollection, comment);
  }

  // Files
  getFiles(ticketId: string): Observable<File[]> {
    const filesCollection = collection(this.firestore, `tickets/${ticketId}/files`);
    return collectionData(filesCollection, { idField: 'fileId' }) as Observable<File[]>;
  }

  addFile(ticketId: string, file: File): Promise<any> {
    const filesCollection = collection(this.firestore, `tickets/${ticketId}/files`);
    return addDoc(filesCollection, file);
  }

  // History
  getHistory(ticketId: string): Observable<TicketHistory[]> {
    const historyCollection = collection(this.firestore, `tickets/${ticketId}/history`);
    return collectionData(historyCollection, { idField: 'historyId' }) as Observable<TicketHistory[]>;
  }

  addHistory(ticketId: string, history: TicketHistory): Promise<any> {
    const historyCollection = collection(this.firestore, `tickets/${ticketId}/history`);
    return addDoc(historyCollection, history);
  }

}
