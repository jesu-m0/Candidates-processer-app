import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { BadRequestException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { CandidateFullNameDto } from './dto/candidate-full-name.dto';

describe('CandidateService', () => {
      let service: CandidateService;

      beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                  providers: [CandidateService],
            }).compile();

            service = module.get<CandidateService>(CandidateService);
      });

      it('throws if no file provided', async () => {
            await expect(
                  service.parseAndSave({ name: 'A', surname: 'B' }, null as any),
            ).rejects.toThrow(BadRequestException);
      });

      it('throws if sheet has <3 columns', async () => {
            const wb = new Workbook();
            const ws = wb.addWorksheet('Test');

            ws.addRow(['col1']); // only 1 column
            const buffer = await wb.xlsx.writeBuffer();
             
            await expect(
                  service.parseAndSave({ name: 'A', surname: 'B' }, { buffer } as any),
            ).rejects.toBeInstanceOf(BadRequestException);
      });

      it('parses a valid Excel row', async () => {
            const wb = new Workbook();
            const ws = wb.addWorksheet('Test');

            ws.addRow(['junior', 2, true]);
            const dto: CandidateFullNameDto = { name: 'Alice', surname: 'Smith' };

            const result = await service.parseAndSave(dto, {
                  buffer: await wb.xlsx.writeBuffer(),
            } as any);
            
            expect(result).toMatchObject({
                  id: expect.any(String),
                  name: 'Alice',
                  surname: 'Smith',
                  seniority: 'junior',
                  years: 2,
                  availability: true,
            });
      });
});
