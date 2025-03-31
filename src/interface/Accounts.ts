export interface AccountsDTO {
  id: string;
  title: string;
  name: string;
  account_type_description: string;
  description?: string;
  balance: string;
  type: "savings" | "checking" | "investment" | "debt";
}
