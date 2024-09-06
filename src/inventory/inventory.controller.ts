import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';  
import { InventoryItem } from 'src/interfaces/inventory-item.interface';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(): InventoryItem[] {
    return this.inventoryService.findAll();
  }

  @Post()
  create(@Body() newItem: Omit<InventoryItem, 'id' | 'addedAt'>): InventoryItem {
    return this.inventoryService.create(newItem);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedItem: Partial<Omit<InventoryItem, 'id' | 'addedAt'>>): InventoryItem {
    return this.inventoryService.update(id, updatedItem);
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    return this.inventoryService.remove(id);
  }
}
