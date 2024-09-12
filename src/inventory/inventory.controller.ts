import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, ParseIntPipe, Query  } from '@nestjs/common';
import { InventoryService } from './inventory.service';  
import { InventoryItem } from 'src/interfaces/inventory-item.interface';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Query('name') name?: string): InventoryItem[] {
    if (name) {
      return this.inventoryService.findByName(name);
    }
    return this.inventoryService.findAll();
  }

  @Post()
  create(@Body() newItem: Omit<InventoryItem, 'id' >): InventoryItem {
    return this.inventoryService.create(newItem);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatedItem: Partial<Omit<InventoryItem, 'id' >>
  ): InventoryItem {
    try {
      return this.inventoryService.update(id, updatedItem);
    } catch (error) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    try {
      this.inventoryService.remove(id);
    } catch (error) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
  }
}
