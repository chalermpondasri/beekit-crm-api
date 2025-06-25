import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    UseGuards,
} from '@nestjs/common'
import { ITestService } from '@domains/test/interfaces/test.service.interface'
import { TestCommand } from '@domains/test/command-query/test.command'
import { CitizenIdGuard } from '@core/guards/citizen-id.guard'

@UseGuards(CitizenIdGuard)
@Controller('/test')
export class TestController {
    public constructor(
        @Inject('TEST_SERVICE')
        private readonly _testService: ITestService,
    ) {
    }

    @Get()
    public testQuery(){
        return this._testService.testQuery()
    }

    @Post('/query')
    public testQueryById(
        @Body('id') id: string,
    ){
        return this._testService.testQuery(id)
    }


    @Post('/create')
    public testCommand(
        @Body() body: TestCommand,
    ){
        return this._testService.testCommand(body)
    }

    @Get('/jwt')
    public testJwt(){
        return {success: true, timestamp: new Date().toISOString()}
    }

}
