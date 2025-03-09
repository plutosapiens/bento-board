import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  getUsers(companyId: string): Observable<User[]> {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('companyId', '==', companyId));
      return collectionData(q, { idField: 'userId' }) as Observable<User[]>;
  }

  getUser(userId: string): Observable<User | undefined> {
    const userDoc = doc(this.firestore, 'users', userId);
    return docData(userDoc, { idField: 'userId' }) as Observable<User | undefined>;
  }

  addUser(user: User): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    return addDoc(usersCollection, user);
  }

  updateUser(user: User): Promise<void> {
    const userDoc = doc(this.firestore, 'users', user.userId!);
    return updateDoc(userDoc, { ...user });
  }

  deleteUser(userId: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', userId);
    return deleteDoc(userDoc);
  }

}
