import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private firestore: Firestore) { }

  getCompanies(): Observable<Company[]> {
    const companiesCollection = collection(this.firestore, 'companies');
    return collectionData(companiesCollection, { idField: 'companyId' }) as Observable<Company[]>;
  }

  getCompany(companyId: string): Observable<Company | undefined> {
    const companyDoc = doc(this.firestore, 'companies', companyId);
    return docData(companyDoc, { idField: 'companyId' }) as Observable<Company | undefined>;
  }

  addCompany(company: Company): Promise<any> {
    const companiesCollection = collection(this.firestore, 'companies');
    return addDoc(companiesCollection, company);
  }

  updateCompany(company: Company): Promise<void> {
    const companyDoc = doc(this.firestore, 'companies', company.companyId!);
    return updateDoc(companyDoc, { ...company });
  }

  deleteCompany(companyId: string): Promise<void> {
    const companyDoc = doc(this.firestore, 'companies', companyId);
    return deleteDoc(companyDoc);
  }

}
