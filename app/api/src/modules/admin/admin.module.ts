//apps/api/src/modules/admin/admin.module.ts ===
import { Module } from '@nestjs/common'
import { AdminController }   from './admin.controller'
import { AdminService }      from './admin.service'
import { AuthCleanupService }from '../auth/auth-cleanup.service'

@Module({
  controllers: [AdminController],
  providers:   [AdminService, AuthCleanupService],
})
export class AdminModule {}