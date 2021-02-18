import { PlayerProvider, ListPlayer, ListRegisterPlayer, AddPlayer, UpdatePlayer } from '../../src'

const mockProvider: PlayerProvider = {
  list: jest.fn(),
  add: jest.fn(),
  listRegister: jest.fn(),
  update: jest.fn()
}

describe('Player use case', () => {
  it('List player', async (done) => {
    const useCase = new ListPlayer(mockProvider)
    const spy = jest.spyOn(mockProvider, 'list')

    await useCase.execute()

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('List register player', async (done) => {
    const useCase = new ListRegisterPlayer(mockProvider)
    const spy = jest.spyOn(mockProvider, 'listRegister')

    await useCase.execute()

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('Add player', async (done) => {
    const useCase = new AddPlayer(mockProvider)
    const spy = jest.spyOn(mockProvider, 'add')

    await useCase.execute({})

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('Update player', async (done) => {
    const useCase = new UpdatePlayer(mockProvider)
    const spy = jest.spyOn(mockProvider, 'update')

    await useCase.execute('', {})

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })
})
