import {
    Body,
    Controller,
    Get,
    Inject,
    Injectable,
    Post,
    UseGuards,
} from '@nestjs/common'
import { CitizenIdGuard } from '@core/guards/citizen-id.guard'
import { AcceptTermGuard } from '@core/guards/accept-term.guard'
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
} from '@nestjs/swagger'
import { RegisterCardCommand } from '@domains/card/command-query/register-card.command'
import { TransitCardType } from '@domains/card/models/card-type.enum'
import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'

@ApiBearerAuth()
@UseGuards(...[CitizenIdGuard, AcceptTermGuard])
@Controller('/cards')
export class CardController {

    public constructor(
        @Inject(ProviderName.RABBIT_CARD_REGISTRATION_SERVICE)
        private readonly _rabbitRegistrationService: IRabbitCardRegistrationService,
        @Inject(ProviderName.EMV_CARD_REGISTRATION_SERVICE)
        private readonly _emvRegistrationService: IEmvCardRegistrationService,
    ) {
    }

    @ApiOperation({
        summary: 'Register a new card',
        description: 'Register a new cards either Rabbit or EMV transit card',
    })
    @ApiBody({type: RegisterCardCommand})
    @Post('/')
    public registerCards(
        @Body() payload: RegisterCardCommand,
    ) {
        if (payload.cardType === TransitCardType.RABBIT_CARD) {
            return this._rabbitRegistrationService.registerRabbitCard(payload)
        }

        if (payload.cardType === TransitCardType.EMV) {
            return this._emvRegistrationService.registerEmvCard(payload)
        }

    }

    @ApiOperation({
        summary: 'List cards',
        description: 'List all registered cards',
    })
    @Get('/')
    public getRegisteredCards() {
        return
    }
}
