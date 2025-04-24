import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateDto } from './dto/candidate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateFullName } from './dto/candidate-full-name.dto';

@Controller('candidates')
export class CandidateController {
      constructor(private readonly candidateService: CandidateService) { }

      @Post('create')
      @UseInterceptors(FileInterceptor('excel'))
      async upload(
            @Body() personalInfoDto: CandidateFullName,
            @UploadedFile() excel: Express.Multer.File,
      ): Promise<CandidateDto> {

            return this.candidateService.parseAndSave(personalInfoDto, excel);

      }

      @Get()
      findAll(): CandidateDto[] {
            return this.candidateService.findAll();
      }
}
