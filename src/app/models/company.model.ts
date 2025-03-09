export interface Company {
  companyId?: string; // Firestore document ID
  name: string;
  ownerId: string;
}