import {
    Body,
    Controller,
    Get,
    HttpCode,
    Inject,
    Post,
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
import { UpdateUserTermCommand } from '@domains/tos/command-query/update-user-term.command'

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
        summary: `Query user accepted term version`,
        description: `Check if user has accepted current term version and latest version.`,
    })
    @ApiResponse({type: UserAcceptedTermResponse, status: 200})
    @UseGuards(CitizenIdGuard)
    @Get('/check')
    public getUserAcceptedTerm() {
        return this._termOfService.getUserAcceptTerm(this._requestContextService.getPsnId())
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: `user accepted term version`,
        description: `user accepted term version.`,
    })
    @ApiResponse({example: {success: true}, status: 200})
    @UseGuards(CitizenIdGuard)
    @HttpCode(200)
    @Post('/accept')
    public updateUserTerm(
        @Body() command: UpdateUserTermCommand,
    ) {
        return this._termOfService.updateUserTerm(this._requestContextService.getPsnId(), command)
    }
}
