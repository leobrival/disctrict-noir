export const GAME_CONSTANTS = {
  MAX_ROUNDS: 4,
  INITIAL_HAND_SIZE: 5,
  MAX_LINE_COLLECTION: 5,
  CARDS_TO_REMOVE: 3,
  INITIAL_LINE_SIZE: 2,
  ACTIONS_PER_PLAYER_PER_ROUND: 6,
  PLAYERS_COUNT: 2,

  VICTORY_CONDITIONS: {
    CITY_CARDS_NEEDED: 3,
  },

  CARD_COUNTS: {
    SOUTIEN: {
      TOTAL: 26,
      BY_VALUE: {
        5: 5,
        6: 6,
        7: 7,
        8: 8,
      },
    },
    ALLIANCE: {
      TOTAL: 7,
      VALUES: [2, 3, 4] as const,
      BY_VALUE: {
        2: 2,
        3: 2,
        4: 3,
      },
    },
    TRAHISON: {
      TOTAL: 9,
      VALUES: [1, 2, 3] as const,
      BY_VALUE: {
        1: 3,
        2: 3,
        3: 3,
      },
    },
    VILLE: {
      TOTAL: 3,
      VALUE: 0,
    },
  },

  SCORING: {
    SOUTIEN_COMPLETE_SET_BONUS: 5,
    SOUTIEN_VALUES: [5, 6, 7, 8] as const,
  },
} as const

export const DECK_COMPOSITION = [
  // SOUTIEN cards
  ...Array(5)
    .fill(null)
    .map(() => ({ type: 'SOUTIEN' as const, value: 5 as const })),
  ...Array(6)
    .fill(null)
    .map(() => ({ type: 'SOUTIEN' as const, value: 6 as const })),
  ...Array(7)
    .fill(null)
    .map(() => ({ type: 'SOUTIEN' as const, value: 7 as const })),
  ...Array(8)
    .fill(null)
    .map(() => ({ type: 'SOUTIEN' as const, value: 8 as const })),

  // ALLIANCE cards
  ...Array(2)
    .fill(null)
    .map(() => ({ type: 'ALLIANCE' as const, value: 2 as const })),
  ...Array(2)
    .fill(null)
    .map(() => ({ type: 'ALLIANCE' as const, value: 3 as const })),
  ...Array(3)
    .fill(null)
    .map(() => ({ type: 'ALLIANCE' as const, value: 4 as const })),

  // TRAHISON cards
  ...Array(3)
    .fill(null)
    .map(() => ({ type: 'TRAHISON' as const, value: 1 as const })),
  ...Array(3)
    .fill(null)
    .map(() => ({ type: 'TRAHISON' as const, value: 2 as const })),
  ...Array(3)
    .fill(null)
    .map(() => ({ type: 'TRAHISON' as const, value: 3 as const })),

  // VILLE cards
  ...Array(3)
    .fill(null)
    .map(() => ({ type: 'VILLE' as const, value: 0 as const })),
]
