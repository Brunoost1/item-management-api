import { Injectable } from '@nestjs/common';
import { InventoryItem } from 'src/interfaces/inventory-item.interface';
@Injectable()
export class InventoryService {
  private items: InventoryItem[] = [];
  private idCounter = 1;

  findAll(): InventoryItem[] {
    return this.items;
  }

  create(newItem: Omit<InventoryItem, 'id' | 'addedAt'>): InventoryItem {
    const item: InventoryItem = {
      id: this.idCounter++,
      addedAt: new Date(),
      ...newItem,
    };
    this.items.push(item);
    return item;
  }

  update(id: number, updatedItem: Partial<Omit<InventoryItem, 'id' | 'addedAt'>>): InventoryItem {
    const itemIndex = this.items.findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...updatedItem,
    };
    return this.items[itemIndex];
  }

  remove(id: number): void {
    const itemIndex = this.items.findIndex((item) => item.id === Number(id));
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    this.items.splice(itemIndex, 1);
  }
}
