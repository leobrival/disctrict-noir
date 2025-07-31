# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

District Noir is a tactical 2-player card game implementation built with AdonisJS (Node.js backend) and React (frontend via InertiaJS). The game involves players competing for control of a criminal district by collecting support cards and city cards over 4 rounds.

## Development Commands

### Core Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run all tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

### AdonisJS Specific

- `node ace serve --hmr` - Development server (same as npm run dev)
- `node ace build` - Build application
- `node ace test` - Run tests with Japa test runner
- `node ace` - See all available Ace commands

### Testing

- Tests are organized in `tests/unit/` and `tests/functional/`
- Unit tests timeout: 2 seconds
- Functional tests timeout: 30 seconds
- Uses Japa test runner with Assert plugin

## Architecture

### Backend (AdonisJS)

- **Framework**: AdonisJS v6 with TypeScript
- **Database**: SQLite with Lucid ORM
- **Authentication**: Built-in AdonisJS auth
- **Validation**: VineJS for form validation
- **Session Management**: AdonisJS sessions
- **Real-time Communication**: Transmit (WebSockets) for game updates and chat
- **Cache/Pub-Sub**: Redis for chat message persistence and real-time messaging

### Frontend (React + InertiaJS)

- **Framework**: React 19 with TypeScript
- **Routing**: InertiaJS (no separate API needed)
- **Styling**: CSS with Tailwind CSS + Shadcn/ui components
- **Build Tool**: Vite with React plugin
- **Real-time**: WebSocket client for game state synchronization and chat

### Key Directories

- `app/` - Backend application code (models, middleware, etc.)
- `inertia/` - Frontend React components and pages
- `config/` - Application configuration files
- `database/` - Migrations and database setup
- `start/` - Application bootstrap files (routes, kernel)
- `resources/` - Views and static resources

### Import Paths

Uses path mapping with `#` prefix:

- `#controllers/*` → `./app/controllers/*.js`
- `#models/*` → `./app/models/*.js`
- `#middleware/*` → `./app/middleware/*.js`
- And similar patterns for other app directories

## Game Domain

### Card Types

- **SOUTIEN** (Support): 26 cards, values 5-8, used for majority scoring
- **ALLIANCE**: 7 cards, values 2-4, direct points
- **TRAHISON** (Betrayal): 9 cards, values 1-3, direct points
- **VILLE** (City): 3 cards, required for immediate victory

### Game Flow

- 4 rounds maximum, 2 players
- Each round: 6 actions per player (5 PLAY + 1 TAKE cards)
- Players can take up to 5 cards from the line once per round
- Victory conditions: Control 3 VILLE cards OR highest points after 4 rounds

### Core Types

```typescript
// Card types
type CardType = 'SOUTIEN' | 'ALLIANCE' | 'TRAHISON' | 'VILLE'
type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface Card {
  id: string
  type: CardType
  value: CardValue
}

// Game types
interface Player {
  id: string
  hand: Card[]
  collectedCards: Card[]
}

interface GameState {
  players: [Player, Player]
  line: Card[]
  currentRound: number
  currentPlayer: number
  hasCollectedThisRound: boolean[]
}
```

### Validation with Zod

```typescript
import { z } from 'zod'

// Validation schemas
const CardTypeSchema = z.enum(['SOUTIEN', 'ALLIANCE', 'TRAHISON', 'VILLE'])
const CardValueSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
])

const CardSchema = z.object({
  id: z.string().uuid(),
  type: CardTypeSchema,
  value: CardValueSchema,
})

const PlayerSchema = z.object({
  id: z.string().uuid(),
  hand: z.array(CardSchema),
  collectedCards: z.array(CardSchema),
})

const GameStateSchema = z.object({
  players: z.tuple([PlayerSchema, PlayerSchema]),
  line: z.array(CardSchema),
  currentRound: z.number().min(1).max(4),
  currentPlayer: z.number().min(0).max(1),
  hasCollectedThisRound: z.array(z.boolean()).length(2),
})
```

### Game Constants

```typescript
export const GAME_CONSTANTS = {
  MAX_ROUNDS: 4,
  INITIAL_HAND_SIZE: 5,
  MAX_LINE_COLLECTION: 5,
  CARDS_TO_REMOVE: 3,
  INITIAL_LINE_SIZE: 2,
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
      VALUES: [2, 3, 4],
    },
    TRAHISON: {
      TOTAL: 9,
      VALUES: [1, 2, 3],
    },
    VILLE: {
      TOTAL: 3,
    },
  },
}
```

### Technical Features to Implement

#### User Interface

- Game board display
- Central card placement area
- Player hands
- Score counter
- Round indicator
- Real-time chat interface per game
- Player connection status indicators

#### Game Mechanics

- Card distribution
- Card placement system
- Card collection system
- Victory condition verification
- Score calculation
- Real-time game state synchronization
- Multi-player session management

#### Interactions

- Card selection and placement
- Card collection choices
- Action validation
- Real-time chat messaging during games
- Game invitation and matchmaking

### Type Usage and Validations

The types and schemas defined above should be used throughout the application to ensure data consistency:

1. Player action validation
2. Game state verification
3. Data serialization/deserialization
4. Client-server communication
5. WebSocket message validation
6. Chat message filtering and validation

### Best Practices

1. Always use defined TypeScript types
2. Validate external data with Zod
3. Use game constants rather than hard-coded values
4. Document complex functions and methods
5. Implement unit tests for validation

## Development Notes

- Hot reloading configured for controllers and middleware
- Uses Better SQLite3 for database
- Edge.js for server-side templates (minimal usage due to InertiaJS)
- Transmit WebSocket server for real-time features
- Redis required for chat persistence and pub/sub messaging
- Game rules documentation available in DEVBOOK.md
- Complete game implementation roadmap in WORKSHEET.md

### Real-time Architecture

#### Transmit Setup

- Install: `npm install @adonisjs/transmit`
- Configure WebSocket channels for game rooms
- Handle real-time game state synchronization
- Manage player connections and disconnections

#### Redis Integration

- Install: `npm install ioredis`
- Configure Redis for chat message storage
- Implement pub/sub for cross-server chat synchronization
- Cache active game sessions and player presence

#### WebSocket Events

- `game:action` - Player actions (play card, take cards)
- `game:state` - Game state updates
- `chat:message` - Chat messages within game rooms
- `player:join` / `player:leave` - Player connection events
- `game:start` / `game:end` - Game lifecycle events
