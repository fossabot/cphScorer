import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Put,
} from "@nestjs/common";
import { RankingService } from "../ranking/ranking.service";
import { TeamService } from "../team/team.service";
import { PlayerUnknowException, UpdateScore } from "@cph-scorer/core";
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { MatchUpdateDTO } from "./DTO/matchUpdate.dto";

@Controller("match")
@ApiTags("Tournament")
export class MatchController {
  constructor(
    private readonly teamService: TeamService,
    private readonly rankingService: RankingService
  ) {}

  @Put("/")
  @HttpCode(204)
  @ApiNoContentResponse({ description: "Match updated" })
  @ApiNotFoundResponse({ description: "Player is unknow" })
  async updateScore(@Body() { match, type }: MatchUpdateDTO): Promise<void> {
    const useCase = new UpdateScore(
      this.rankingService.dao,
      this.teamService.dao
    );

    try {
      await useCase.exec(match, type);
    } catch (e) {
      if (e instanceof PlayerUnknowException)
        throw new NotFoundException("Invalid user");
      throw new InternalServerErrorException(e);
    }
  }
}
