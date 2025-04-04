export interface TransactionsDTO {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  timestamp: string;
}
