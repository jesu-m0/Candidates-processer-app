import { Module } from '@nestjs/common';
import { CandidateModule } from './features/candidate/candidate.module';
@Module({
  imports: [CandidateModule],
})
export class AppModule {}
