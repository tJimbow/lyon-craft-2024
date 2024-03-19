import { Price } from '@/common/domain/Price';
import { describe, it, expect } from 'vitest';
import { dataBackendResponse, stubAxiosHttp } from '../../http/AxiosHttpStub';
import { crepesFixture } from './fixture/Crepes.fixture';
import { CrepeRepositoryHttp } from '@/common/secondary/CrepeRepositoryHttp';
import { Crepe } from '@/common/domain/Crepe';

describe('CrepesRepositoryHttp', () => {
  it('should list', async () => {
    const axiosHttp = stubAxiosHttp();
    axiosHttp.get.resolves(dataBackendResponse(crepesFixture));
    const crepeRepository = new CrepeRepositoryHttp(axiosHttp);

    const crepes = await crepeRepository.list();

    const crepesExpected: Crepe[] = [
      {
        price: Price.of(2),
        ingredients: ['sucre'],
      },
      {
        price: Price.of(3),
        ingredients: ['beurre', 'sucre'],
      },
      {
        price: Price.of(3),
        ingredients: ['sucre', 'citron'],
      },
      {
        price: Price.of(3),
        ingredients: ['caramel'],
      },
    ];

    expect(crepes).toEqual(crepesExpected);
  });
});
