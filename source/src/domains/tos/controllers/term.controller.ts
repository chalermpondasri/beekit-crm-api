import {
    Controller,
    Get,
    Inject,
    UseGuards,
} from '@nestjs/common'
import { ITermOfServiceService } from '@domains/tos/interfaces/service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { CitizenIdGuard } from '@core/guards/citizen-id.guard'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'
import { UserAcceptedTermResponse } from '@domains/tos/response/user-accepted-term.response'

@Controller('/terms')
export class TermController {
    public constructor(
        @Inject(ProviderName.TERM_OF_SERVICE_SERVICE)
        private readonly _termOfService: ITermOfServiceService,
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
    ) {
    }


    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Query user accepted term'
    })
    @ApiResponse({type: UserAcceptedTermResponse, status: 200})
    @UseGuards(CitizenIdGuard)
    @Get('/me')
    public getUserAcceptedTerm() {
        return this._termOfService.getUserAcceptTerm(this._requestContextService.getPsnId())
    }
}
