export interface Ticket {
  ticketId?: string; // Firestore document ID
  boardId: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdAt?: Date;
  updatedAt?: Date;
}