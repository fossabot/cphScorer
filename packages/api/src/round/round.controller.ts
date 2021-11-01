import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  NotFoundException,
} from "@nestjs/common";
import { PlayerService } from "../player/player.service";
import { GenerateRound, GetRound, MaxCallError } from "@cph-scorer/core";
import { RoundService } from "./roud.service";
import { TeamService } from "../team/team.service";
import { MatchService } from "../match/match.service";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { EntityNotFoundError } from "typeorm";

import { RoundDTO } from "./DTO/round.dto";

@Controller("round")
@ApiTags("Tournament")
export class RoundController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService,
    private readonly teamService: TeamService,
    private readonly matchService: MatchService
  ) {}

  @Post("/generate/:number")
  @HttpCode(201)
  @ApiCreatedResponse({ description: "Rounds was generated" })
  @ApiConflictResponse({
    description: "The generation is mathematicaly imposible",
  })
  async generate(@Param("number") numberOfRound: number): Promise<void> {
    const useCase = new GenerateRound(
      this.playerService.dao,
      this.roundService.dao,
      this.teamService.dao,
      this.matchService.dao
    );

    try {
      await useCase.exec(numberOfRound);
    } catch (e) {
      if (e instanceof MaxCallError) throw new ConflictException(e.message);
      throw new InternalServerErrorException(e);
    }
  }

  @Get("/:round")
  @ApiOkResponse({ description: "One round", type: RoundDTO })
  @ApiNotFoundResponse({ description: "Round number is invalid" })
  async list(@Param("round") round: number): Promise<RoundDTO> {
    const useCase = new GetRound(this.roundService.dao);

    try {
      return await useCase.exec(round);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException("Invalid round");
      }
      throw new InternalServerErrorException(e);
    }
  }
}
