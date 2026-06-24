import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesCurricularesService } from './unidades-curriculares.service';

describe('UnidadesCurricularesService', () => {
  let service: UnidadesCurricularesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadesCurricularesService],
    }).compile();

    service = module.get<UnidadesCurricularesService>(UnidadesCurricularesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
