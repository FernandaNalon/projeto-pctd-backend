import { Test, TestingModule } from '@nestjs/testing';
import { ObservacoesService } from './observacoes.service';

describe('ObservacoesService', () => {
  let service: ObservacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservacoesService],
    }).compile();

    service = module.get<ObservacoesService>(ObservacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
