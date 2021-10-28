import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetRanking } from "@cph-scorer/core";
import { Ranking } from "@cph-scorer/model";
import { RankingService } from "./ranking.service";
import { RankingDTO } from "./DTO/Ranking.dto";
import { TypeDTO } from "../util/type.dto";

@Controller("ranking")
@ApiTags("Tournament")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get("/:type")
  @ApiOkResponse({
    description: "Get rankingof a type tournament",
    type: [RankingDTO],
  })
  async get(@Param() { type }: TypeDTO): Promise<Ranking[]> {
    const useCase = new GetRanking(this.rankingService.dao);

    return await useCase.exec(type);
  }
}
