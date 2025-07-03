import {
    IBaseCardResponse,
    ICardResponse,
    IGetCardListResponse,
    IRabbitTransitAdapter,
    IRegisterSelectedCard,
    IUpdateCard,
} from '@shared/adapters/interfaces/rabbit-transit.interface'
import {
    catchError,
    map,
    mergeMap,
    Observable,
    of,
} from 'rxjs'
import {
    AxiosInstance,
} from 'axios'
import qs from 'qs'
import crypto from 'crypto'
import * as console from 'node:console'
import { rethrow } from '@nestjs/core/helpers/rethrow'

export class RabbitTransitAdapter implements IRabbitTransitAdapter {

    public constructor(
        private readonly _httpClient: AxiosInstance,
        private readonly _secret: string,
    ) {
        this._httpClient.defaults.headers.common['Content-Type'] = 'application/json'
        this._httpClient.defaults.headers.common['Accept'] = 'application/json'

        this._httpClient.interceptors.request.use((request) => {
            const nonce = crypto.randomBytes(16).toString('base64')

            let params: string
            if (request.method === 'get' || request.method === 'delete') {
                params = qs.stringify(request.params)
            } else {
                params = JSON.stringify(request.data)
            }

            const stringToSign = `${this._secret}${request.url}${params}${nonce}`
            const signature = crypto.createHmac('sha256', this._secret)
                .update(stringToSign)
                .digest()
                .toString('base64')
            request.headers.set('x-SIGNATURE-NONCE', nonce)
            request.headers.set('X-SIGNATURE', signature)
            return request
        })
    }

    private _transformCitizenId(citizenId: string) {
        return citizenId.replaceAll('-', '')
    }

    public getCardList(citizenId: string): Observable<IGetCardListResponse> {
        return of(this._transformCitizenId(citizenId)).pipe(
            mergeMap( async (cid) => this._httpClient.post(`/cards/list`, {id_no: cid})),
            map(({data}) => {
                const response: IGetCardListResponse = {
                    cards: data.card_list?.map(card => {
                        return <IBaseCardResponse>{
                            cardId: card.card_id,
                            transitToken: card.transit_token,
                            campaignBlockStatus: card.campaign_register_status,
                            campaignRegisterStatus: card.campaign_block_status,
                        }
                    }),
                }
                return response
            }),
            catchError(err => {
                console.error(err)
                rethrow(err)
            }),
        )
    }

    public registerSelectedCard(selectedCard: IRegisterSelectedCard): Observable<ICardResponse> {
        return of(selectedCard).pipe(
            map(input => ({
                id_no: this._transformCitizenId(input.citizenId),
                card_id_register: selectedCard.cardId,
            })),
            mergeMap(async (data) => this._httpClient.post(`/cards`, data)),
            map(({data}) => {
                const {card_info} = data
                const response: ICardResponse = {
                    transitToken: card_info?.transit_token,
                    cardId: card_info?.card_id,
                    campaignBlockStatus: card_info?.campaign_block_status,
                    campaignRegisterStatus: card_info?.campaign_block_status,
                }
                return response
            }),
            catchError(err => {
                console.error(err)
                rethrow(err)
            }),
        )
    }

    public updateCardStatus(updateCard: IUpdateCard): Observable<ICardResponse> {
        return of(updateCard).pipe(
            map(card => {

                const cardId = card.cardId.substring(0, 12)

                return {
                    transit_token: card.transitToken,
                    card_id: cardId,
                    campaign_register_status: card.campaignRegisterStatus,
                    campaign_block_status: card.campaignBlockStatus,
                }
            }),
            mergeMap(async (data) => this._httpClient.put(`/cards`, data)),
            map(({data}) => {
                const {card_info} = data
                const response: ICardResponse = {
                    campaignBlockStatus: card_info?.campaign_block_status,
                    campaignRegisterStatus: card_info?.campaign_register_status,
                    cardId: updateCard.cardId,
                    transitToken: card_info?.transit_token,
                }
                return response
            }),
            catchError(err => {
                console.error(err.body)
                rethrow(err)
            })
        )
    }
}
