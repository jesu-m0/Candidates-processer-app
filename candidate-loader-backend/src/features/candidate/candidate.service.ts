import { BadRequestException, Injectable } from "@nestjs/common";
import { isSeniority, Seniority } from "./entities/seniority.enum";
import { Cell, Workbook, Worksheet } from "exceljs";
import { CandidateDto } from "./dto/candidate.dto";
import { CandidateFullName } from "./dto/candidate-full-name.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CandidateService {

      private readonly candidates: CandidateDto[] = []; //This could be replaced by a repository with a conection to the DB.


      async parseAndSave(personalInfo: CandidateFullName, excelFile: Express.Multer.File): Promise<CandidateDto> {

            if (!excelFile?.buffer) {
                  throw new BadRequestException('Excel file is missing');
            }

            // load workbook & first sheet
            const workbook = new Workbook();
            await workbook.xlsx.load(excelFile.buffer);
            const sheet = workbook.worksheets[0];
            if (!sheet) {
                  throw new BadRequestException('Excel contains no sheets');
            }

            // enforce exactly one row and 3 columns
            if (sheet.rowCount !== 1) {
                  throw new BadRequestException('Excel must have exactly one data row');
            }
            const row = sheet.getRow(1);
            if (row.cellCount < 3) {
                  throw new BadRequestException('Row must have 3 columns: Seniority, Years, Availability');
            }

            // ── ASSUMPTION: the Excel row is correctly formatted as [string, number, boolean] 
            // No further validation is performed in this technical test scope.
            const seniorityRaw = row.getCell(1).text.trim().toLowerCase();
            const yearsRaw = row.getCell(2).value;
            const availabilityRaw = row.getCell(3).text.trim().toLowerCase();

            const seniority = seniorityRaw as Seniority;
            const years = Number(yearsRaw);
            const availability = availabilityRaw === 'true';

            const newCandidate: CandidateDto = {
                  id: uuidv4(),
                  name: personalInfo.name,
                  surname: personalInfo.surname,
                  seniority,
                  years,
                  availability,
            };

            this.candidates.push(newCandidate);
            return newCandidate;
      }

      findAll(): CandidateDto[] {
            return this.candidates;
      }
}