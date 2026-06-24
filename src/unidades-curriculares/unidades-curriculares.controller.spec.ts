import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesCurricularesController } from './unidades-curriculares.controller';

describe('UnidadesCurricularesController', () => {
  let controller: UnidadesCurricularesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadesCurricularesController],
    }).compile();

    controller = module.get<UnidadesCurricularesController>(UnidadesCurricularesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
