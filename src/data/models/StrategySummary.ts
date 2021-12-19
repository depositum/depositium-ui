import StrategySummaryDto from "../dtos/StrategySummaryDto";

export default interface StrategySummary {
  totalDepositAmount: number;
  totalProfitAmount: number;
  avgApr: number;
}

export function convertStrategySummaryDtoToModel(
  dto: StrategySummaryDto,
): StrategySummary {
  return {
    avgApr: Number(dto.avg_apr),
    totalDepositAmount: Number(dto.total_deposit_amount),
    totalProfitAmount: Number(dto.total_profit_amount),
  };
}
