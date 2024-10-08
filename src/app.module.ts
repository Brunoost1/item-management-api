import { Module } from '@nestjs/common';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class AppModule {}
