import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShipFiltersDto {
    @ApiProperty({ required: false })
    status : 'at_anchor' | 'moored';
}