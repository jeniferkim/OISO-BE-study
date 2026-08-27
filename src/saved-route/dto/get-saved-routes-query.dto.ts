import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetSavedRoutesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsIn(['latest', 'oldest', 'savingAmountDesc'])
  sort: string = 'latest';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minSavingAmount?: number;

  @IsOptional()
  @IsString()
  keyword?: string;
}
