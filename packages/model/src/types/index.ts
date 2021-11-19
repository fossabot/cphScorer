export declare type uuid = `${string}-${string}-${string}-${string}-${string}`;

export declare type TeamMate = Record<uuid, uuid[]>;

export declare type SimpleTeam = uuid[];

export declare type SimpleMatch = [teamOne: SimpleTeam, teamTwo: SimpleTeam];

export declare type SimpleRound = SimpleMatch[];

export declare type SimpleTournament = SimpleRound[];
