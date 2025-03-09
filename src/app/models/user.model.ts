export interface User {
  userId?: string; // Firestore document ID
  email: string;
  companyId: string;
  role: string;
}