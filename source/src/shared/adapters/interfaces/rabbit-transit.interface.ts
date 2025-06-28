import { ISODateTime } from '@core/types/datestring.type'
import { Observable } from 'rxjs'

export enum CampaignRegisterStatus {
    REGISTERED = 'REGISTERED',
    UNREGISTERED = 'UNREGISTERED',
}

export enum CampaignBlockStatus {
    BLOCKED = 'BLOCKED',
    NOT_BLOCK = 'NOT_BLOCK',
}

export interface IBaseCardResponse {
    transitToken: string
    cardId: string
    registeredDate: ISODateTime
    campaignRegisterStatus: CampaignRegisterStatus
    campaignBlockStatus: CampaignBlockStatus
}

export interface IGetCardListResponse {
    cards: IBaseCardResponse[]
}

export interface IRegisterSelectedCard {
    citizenId: string
    cardId: string
}

export interface IUpdateCard {
    transitToken: string
    cardId: string
    campaignRegisterStatus: CampaignRegisterStatus
    campaignBlockStatus: CampaignBlockStatus
}
export type ICardResponse = Omit<IBaseCardResponse, 'registeredDate'>

export interface IRabbitTransitAdapter {
    /**
     * for development and debugging purpose
     * @param citizenId
     */
    getCardList(citizenId: string): Observable<IGetCardListResponse>

    registerSelectedCard(selectedCard: IRegisterSelectedCard): Observable<ICardResponse>

    updateCardStatus(updateCard: IUpdateCard): Observable<ICardResponse>

}
