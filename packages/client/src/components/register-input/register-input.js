import valid from '../../static/js/util/form'
import { get, post } from '../../static/js/util/client'
import { PLAYER } from '../../static/js/util/route'
import { RankingType } from '@cph-scorer/model'

function clear(input) {
    input.value = ""
}

export default function () {
    Alpine.data('registerInput', () => ({
        player: [],
        rankingType: Object.values(RankingType),

        async init() {
            const data = await get(PLAYER.READ)
            this.player.push(...data)
        },

        async submit(event) {
            event.preventDefault()

            const data = new FormData(event.target)
            const id = event.target.querySelector(`option[value="${data.get('player')}"]`).dataset.id            

            await post(PLAYER.CREATE_REGISTER, { id, type: data.get('rankingType') })            

            Alpine.store('RegisterStore').add(data.get('player'))
            event.target.classList.remove('was-validated')

            clear(event.target.querySelector('input[name="player"]'))
        },

        valid
    }))
}