import { Test, TestingModule } from '@nestjs/testing';
import { ObservacoesController } from './observacoes.controller';

describe('ObservacoesController', () => {
  let controller: ObservacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservacoesController],
    }).compile();

    controller = module.get<ObservacoesController>(ObservacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
