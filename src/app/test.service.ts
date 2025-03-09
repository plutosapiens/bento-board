import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private firestore: Firestore) {}

  async addTestData() {
    try {
      const testCollection = collection(this.firestore, 'testData');
      await addDoc(testCollection, { message: 'Hello from Angular 19!' });
      console.log('Test data added to Firestore!');
    } catch (error) {
      console.error('Error adding test data:', error);
    }
  }

  getTestData(): Observable<any[]> {
    const testCollection = collection(this.firestore, 'testData');
    return collectionData(testCollection, { idField: 'id' });
  }
}