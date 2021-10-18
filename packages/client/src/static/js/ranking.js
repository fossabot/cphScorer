import "regenerator-runtime/runtime.js";
import Alpine from 'alpinejs'
import { RankingType } from '@cph-scorer/model';
import { get } from './util/client';
import { RANKING } from './util/route'

window.Alpine = Alpine

function loadPage() {
    const rankinType = Object.values(RankingType)

    Alpine.data('ranking', () => ({
        rankinType,
        selectedRanking: rankinType[0],
        rankings: [],

        async init() {
            const data = await get(RANKING.READ(this.selectedRanking))
            this.rankings = data
        },

        async changeSelected({ target }) {
            this.selectedRanking = target.dataset.index
            await this.init()
        }
    }))
}

document.addEventListener('alpine:init', () => {
    loadPage()
})

Alpine.start()