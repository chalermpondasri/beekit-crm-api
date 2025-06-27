import {
    Body,
    Controller,
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
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { RabbitRegisterResponse } from '@domains/card/response/rabbit-register.response'

@ApiBearerAuth()
@UseGuards(...[CitizenIdGuard, AcceptTermGuard])
@Controller('/cards')
export class CardController {

    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.RABBIT_CARD_REGISTRATION_SERVICE)
        private readonly _rabbitRegistrationService: IRabbitCardRegistrationService,
        @Inject(ProviderName.EMV_CARD_REGISTRATION_SERVICE)
        private readonly _emvRegistrationService: IEmvCardRegistrationService,
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
        return this._rabbitRegistrationService.registerRabbitCard(this._requestContextService.getPsnId(), payload)
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
        return this._emvRegistrationService.registerEmvCard(this._requestContextService.getPsnId(), payload)
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
