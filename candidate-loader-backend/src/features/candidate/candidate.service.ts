import { BadRequestException, Injectable } from '@nestjs/common';
import { CandidateDto } from './dto/candidate.dto';
import { Workbook } from 'exceljs';
import { isSeniority, Seniority } from './entities/seniority.enum';
import { v4 as uuidv4 } from 'uuid';
import { CandidateFullName } from './dto/candidate-full-name.dto';


@Injectable()
export class CandidateService {

      private candidates: CandidateDto[] = [];

      async parseAndSave(candidatePersonalInfo: CandidateFullName, excel: Express.Multer.File): Promise<CandidateDto> {
            if (!excel || !excel.buffer) {
                  throw new BadRequestException('Missing excel');
            }

            const workbook = new Workbook();
            await workbook.xlsx.load(excel.buffer);

            const worksheet = workbook.worksheets[0];
            const headerRow = worksheet.getRow(1);
            const dataRow = worksheet.getRow(2);
            if (headerRow.cellCount < 3 || dataRow.cellCount < 3) {
                  throw new BadRequestException('Excel has to have at least 3 columns: seniority, years, availability');
            }

            const seniorityText = dataRow.getCell(1).text.trim().toLowerCase();
            if (!isSeniority(seniorityText)) {
                  throw new BadRequestException(
                        `Invalid seniority: '${seniorityText}'. Invalid values: ${Object.values(Seniority).join(', ')}`
                  );
            }

            const yearsText = dataRow.getCell(2).text.trim();
            const availabilityText = dataRow.getCell(3).text.trim().toLowerCase();

            const newCandidate: CandidateDto = {
                  id: uuidv4(),
                  name: candidatePersonalInfo.name,
                  surname: candidatePersonalInfo.surname,
                  seniority: seniorityText,
                  years: Number(yearsText),
                  availability: availabilityText === 'true',
            };

            this.candidates.push(newCandidate);
            return newCandidate;
      }

      findAll(): CandidateDto[] {
            return this.candidates;
      }

}

