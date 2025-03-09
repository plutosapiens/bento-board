export interface TicketHistory {
  historyId?: string; // Firestore document ID
  userId: string;
  timestamp: Date;
  changes: any; // You can create a more specific type for changes
}