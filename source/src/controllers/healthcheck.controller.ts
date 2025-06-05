import {
    Controller,
    Get,
    HttpCode,
} from '@nestjs/common'
import {
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger'

@Controller('/healthcheck')
export class HealthcheckController {

    @ApiOperation({
        summary: 'Health check',
    })
    @ApiOkResponse(
        {
            description: 'Health check',
            example: {
                status: 'ok',
                timestamp: '2021-01-01T00:00:00.000Z',
            },
        },
    )
    @Get('/')
    @HttpCode(200)
    public healthCheck() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        }
    }
}
