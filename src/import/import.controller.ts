import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorHandling } from 'src/config/Error';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  
  constructor(
    private readonly importService: ImportService,
    ) {}

  @ApiOperation({ summary: 'sheet upload' })  
  @UseInterceptors(AnyFilesInterceptor())
  @Post('/sheet')
  async uploadPhoto(@Body() { body }, @UploadedFiles() file) {
    try {
      //console.log("body", body)
      //console.log("file", file)
      
      return await this.importService.processSheet(file[0], body);
    } catch (error) {
      new ErrorHandling(error);
    }
  }
}
