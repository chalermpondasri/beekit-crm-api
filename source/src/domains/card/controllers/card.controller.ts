import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Post,
    UseGuards,
} from '@nestjs/common'
import { CitizenIdGuard } from '@core/guards/citizen-id.guard'
import { AcceptTermGuard } from '@core/guards/accept-term.guard'
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'
import {
    RegisterCardCommandWithOptions,
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import { ICardRegistrationService } from '@domains/card/interfaces/service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { RabbitRegisterResponse } from '@domains/card/response/rabbit-register.response'
import { CardResponse } from '@domains/card/response/card.response'
import { UnregisterCardCommand } from '@domains/card/command-query/unregister-card.command'

@ApiBearerAuth()
@UseGuards(...[CitizenIdGuard, AcceptTermGuard])
@Controller('/cards')
export class CardController {

    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.CARD_REGISTRATION_SERVICE)
        private readonly _cardRegistrationService: ICardRegistrationService,
    ) {
    }

    @ApiOperation({
        summary: 'Register Rabbit card',
        description: 'Register a new Rabbit card',
    })
    @ApiBody({type: RegisterRabbitCardCommand})
    @ApiResponse(
        {
            type: RabbitRegisterResponse,
            status: 201,
        },
    )
    @Post('/register/rabbit')
    public registerRabbitCards(
        @Body() payload: RegisterRabbitCardCommand,
    ) {
        const data: RegisterCardCommandWithOptions = {
            ...payload,
            birthDate: this._requestContextService.getBirthDate(),
        }
        return this._cardRegistrationService.registerRabbitCard(this._requestContextService.getPsnId(), data,
        )
    }

    @ApiOperation({
        summary: 'Register EMV card',
        description: 'Register a new EMV card',
    })

    @ApiBody({type: RegisterEmvCardCommand})
    @Post('/register/emv')
    public registerEmvCards(
        @Body() payload: RegisterEmvCardCommand,
    ) {
        const data : RegisterCardCommandWithOptions = {
            ...payload,
            birthDate: this._requestContextService.getBirthDate(),

        }
        return this._cardRegistrationService.registerEmvCard(this._requestContextService.getPsnId(), data)
    }

    @ApiOperation({
        summary: 'List cards',
        description: 'List all registered cards',
    })
    @ApiResponse({
        description: 'List of cards',
        type: [CardResponse],
        status: 200,
    })
    @ApiResponse({
        description: 'No cards found',
        status: 204,
    })
    @Get('/')
    public getRegisteredCards() {
        return this._cardRegistrationService.getRegisteredCards(this._requestContextService.getPsnId())
    }


    @ApiOperation({
        summary: 'Unregister card',
        description: 'Unregister a card',
    })
    @ApiBody({type: UnregisterCardCommand})
    @ApiResponse({
        description: 'Card unregistered',
        status: 200,
    })
    @ApiResponse({
        description: 'Card not found',
        status: 404,
    })
    @Delete('/')
    public unregisterCard(
        @Body() payload: UnregisterCardCommand,
    ) {
        return this._cardRegistrationService.unregisterCard(this._requestContextService.getPsnId(), payload)
    }
}
