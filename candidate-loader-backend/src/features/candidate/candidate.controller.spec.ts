import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';

describe('CandidateController', () => {
      let controller: CandidateController;

      const mockService = {
            parseAndSave: jest.fn().mockResolvedValue({ id: '1', name: 'X', surname: 'Y' }),
            findAll: jest.fn().mockReturnValue([{ id: '1', name: 'X', surname: 'Y' }]),
      };

      beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                  controllers: [CandidateController],
                  providers: [
                        { provide: CandidateService, useValue: mockService }
                  ]
            }).compile();

            controller = module.get<CandidateController>(CandidateController);
            jest.clearAllMocks();
      });


      it('POST /candidates/create calls service.parseAndSave', async () => {
            const dto = { name: 'X', surname: 'Y' };
            const file = { buffer: Buffer.from('') } as Express.Multer.File;

            const result = await controller.upload(dto, file);

            expect(mockService.parseAndSave).toHaveBeenCalledWith(dto, file);
            expect(result).toEqual({ id: '1', name: 'X', surname: 'Y' });
      });

      it('GET /candidates returns service.findAll()', () => {
            const result = controller.findAll();

            expect(mockService.findAll).toHaveBeenCalled();
            expect(result).toEqual([{ id: '1', name: 'X', surname: 'Y' }]);
      });
});
