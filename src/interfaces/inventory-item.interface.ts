export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  available: boolean;
  addedAt: Date;
}
