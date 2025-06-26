import {
    CampaignBlockStatus,
    CampaignRegisterStatus,
    IRabbitTransitAdapter,
} from '@shared/adapters/interfaces/rabbit-transit.interface'
import { RabbitTransitAdapter } from '@shared/adapters/rabbit/rabbit-transit.adapter'
import axios from 'axios'
import { firstValueFrom } from 'rxjs'

xdescribe('Rabbit Transit', () => {
    const rabbitBaseUrl = 'https://uat-cloud-id-api.rabbit.co.th/dga'
    const rabbitSecret = '4cHEj5ZTxsR2U/4W2mTq9nCkhEVIeeJJOnFD1xePpIs='
    let adapter: IRabbitTransitAdapter
    beforeEach(() => {
        adapter = new RabbitTransitAdapter(
            axios.create({baseURL: rabbitBaseUrl}),
            rabbitSecret,
        )
    })
    it('can connect list cards', async () => {
        const result = await firstValueFrom(adapter.getCardList('1101401058903'))
        expect(result.cards).toHaveLength(4)
        expect(result.cards[0].cardId).toEqual('088734521678')
    })

    it('can register card', async () => {
        const result = await firstValueFrom(adapter.registerSelectedCard({
            cardId: '0839151204242',
            citizenId: '1101401058903',
        }))
        expect(result.cardId).toEqual('0839151204242')
    })

    it('can update card', async () => {
        const payload = {
            transitToken: '68ce2cb7ed1170d67932655b331799f4eb6abde5b69fc3525c39b29fb2650f1c-0839151204242',
            cardId: '083915120424',
            campaignRegisterStatus: CampaignRegisterStatus.REGISTERED,
            campaignBlockStatus: CampaignBlockStatus.BLOCKED,
        }
        const result = await firstValueFrom(adapter.updateCardStatus(payload))
        expect(result.cardId).toEqual('083915120424')
    })
})
