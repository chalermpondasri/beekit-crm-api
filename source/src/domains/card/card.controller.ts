import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common'
import { CitizenIdGuard } from '@core/guards/citizen-id.guard'
import { AcceptTermGuard } from '@core/guards/accept-term.guard'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('/cards')
export class CardController {
    @Get('/')

    @UseGuards(...[CitizenIdGuard, AcceptTermGuard])
    @ApiBearerAuth()
    public getRegisteredCards(){
        return
    }

}
