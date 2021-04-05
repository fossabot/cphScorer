import { ListPlayer, ListRegisterPlayer, AddPlayer, UpdatePlayer } from '../../src'
import { mockPlayerProvider } from '../__mocks__/provider'

const provider = new mockPlayerProvider()

describe('Player use case', () => {
  it('List player', async (done) => {
    const useCase = new ListPlayer(provider)
    const spy = jest.spyOn(provider, 'list')

    await useCase.execute()

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('List register player', async (done) => {
    const useCase = new ListRegisterPlayer(provider)
    const spy = jest.spyOn(provider, 'listRegister')

    await useCase.execute()

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('Add player', async (done) => {
    const useCase = new AddPlayer(provider)
    const spy = jest.spyOn(provider, 'add')

    await useCase.execute({})

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })

  it('Update player', async (done) => {
    const useCase = new UpdatePlayer(provider)
    const spy = jest.spyOn(provider, 'update')

    await useCase.execute('', {})

    expect(useCase).toBeDefined()
    expect(spy).toHaveBeenCalled()

    done()
  })
})
