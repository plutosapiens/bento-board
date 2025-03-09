export interface Board {
  boardId?: string; // Firestore document ID
  companyId: string;
  name: string;
  type: string;
}