# Worksheet

- [x] **Initial Configuration**
  - [x] Adonis setup with Inertia
  - [x] Tailwind CSS configuration
  - [x] UI components installation (shadcn/ui)
  - [ ] Zustand installation and configuration for state management
  - [ ] Zod installation for data validation
  - [ ] Transmit installation and WebSocket configuration
  - [ ] Redis installation and configuration for chat persistence

- [ ] **Types and Interfaces**
  - [ ] Base types (GameState, Player, Card)
  - [ ] Game constants (GAME_CONSTANTS)
  - [ ] Zod validation schemas (CardSchema, PlayerSchema, GameStateSchema)
  - [ ] Action types (PlayCardAction, TakeCardsAction)
  - [ ] Score calculation types
  - [ ] WebSocket message types (GameActionMessage, ChatMessage)
  - [ ] Real-time event types for Transmit

- [ ] **Basic User Interface**
  - [ ] game-board.tsx component for main display
  - [ ] game-card.tsx component for card display
  - [ ] player-hand.tsx component for player hands
  - [ ] Basic layout with turn management
  - [ ] chat-panel.tsx component for in-game chat
  - [ ] connection-status.tsx component for player presence

- [ ] **State Management**
  - [ ] Zustand store setup with initial state
  - [ ] Basic actions (playCard, takeCards)
  - [ ] Action validators (canPlayCard, canTakeCards)
  - [ ] Turn management (switchPlayer, checkTurnEnd)
  - [ ] Persistence with localStorage
  - [ ] State hydration on app load
  - [ ] WebSocket connection management in store
  - [ ] Real-time state synchronization with other players

- [ ] **Card System**
  - [ ] Card generation functions (SOUTIEN: 26, ALLIANCE: 7, TRAHISON: 9, VILLE: 3)
  - [ ] Initial deck implementation (45 cards total, 3 removed randomly)
  - [ ] Card distribution (5 per player)
  - [ ] Initial central line (2 cards)
  - [ ] Deck shuffle function with crypto.randomUUID()
  - [ ] Card display utilities (colors, icons by type)

- [ ] **Game Logic**
  - [ ] Action execution logic (play card to line, take cards from line)
  - [ ] Turn validation (6 actions per player per round)
  - [ ] Collection restrictions (once per round, max 5 cards or all available)
  - [ ] Final score calculation
  - [ ] Score display in interface
  - [ ] End game management
  - [ ] Game initialization and reset functions

- [ ] **Game Rules**
  - [ ] Victory condition verification
    - [ ] 3 VILLE cards (implemented)
    - [ ] Score calculation after 4 rounds

- [ ] **Score Calculation**
  - [ ] SOUTIEN card points (majorities by value: 5, 6, 7, 8)
  - [ ] Bonus for complete sets of 4 different SOUTIEN values (5 points)
  - [ ] ALLIANCE card direct points (values 2, 3, 4)
  - [ ] TRAHISON card direct points (values 1, 2, 3)
  - [ ] Tie handling (highest SOUTIEN majority wins)
  - [ ] Score calculation utility functions
  - [ ] Unit tests for score calculation edge cases

- [ ] **Score Interface**
  - [ ] ScoreBoard component
  - [ ] Points display by card type
  - [ ] Bonus visualization
  - [ ] End game modal

- [ ] **Round Management**
  - [ ] 4-round system implementation
  - [ ] Round transition logic
  - [ ] New card distribution (5 per player each round)
  - [ ] Uncollected card preservation in line
  - [ ] First player rotation (CAMP token)
  - [ ] Action counter reset per round
  - [ ] Collection permission reset per round

- [ ] **Real-time Communication**
  - [ ] WebSocket channel setup for game rooms
  - [ ] Transmit event handlers (game actions, chat)
  - [ ] Redis chat message persistence
  - [ ] Player connection/disconnection handling
  - [ ] Game state synchronization between clients
  - [ ] Chat message validation and filtering
  - [ ] Reconnection logic for dropped connections

- [ ] **Chat System**
  - [ ] Chat message model and storage (Redis)
  - [ ] Real-time chat message broadcasting
  - [ ] Chat history retrieval for game sessions
  - [ ] Message timestamp and player identification
  - [ ] Chat moderation features (profanity filter)
  - [ ] Emoji support in chat messages
  - [ ] Chat notification system

- [ ] **Advanced User Interface**
  - [ ] Round indicator (1-4 with CAMP token visual)
  - [ ] Action counter per player (showing remaining actions)
  - [ ] Card collection visualization (grouped by type)
  - [ ] Game animations (card movement, collection effects)
  - [ ] Information messages (turn notifications, action feedback)
  - [ ] Player status indicators (can collect cards, remaining actions)
  - [ ] Card hover effects and selection states
  - [ ] Real-time connection status indicators
  - [ ] Chat panel with message history and input

- [ ] **Testing & Quality**
  - [ ] Unit tests for game logic
  - [ ] Unit tests for score calculation
  - [ ] Integration tests for state management
  - [ ] Component testing with React Testing Library
  - [ ] End-to-end game flow testing
  - [ ] WebSocket integration testing
  - [ ] Redis connection and persistence testing
  - [ ] Multi-client game synchronization testing

- [ ] **Improvements**
  - [ ] Action history with replay functionality
  - [ ] Action undo (last action only)
  - [ ] Spectator mode
  - [ ] Game statistics (games played, win rate)
  - [ ] Game rules reference modal
  - [ ] Responsive design for mobile devices

## Immediate Priorities

1. **Foundation Setup (High Priority)**
   - [ ] Install and configure Zustand + Zod
   - [ ] Install and configure Transmit + Redis
   - [ ] Create all base types and constants
   - [ ] Setup Zod validation schemas
   - [ ] Initialize Zustand store structure

2. **Core Game Logic (High Priority)**
   - [ ] Implement card generation and deck management
   - [ ] Create game initialization functions
   - [ ] Implement basic action logic (play/take cards)
   - [ ] Add turn and round management

3. **Basic UI Components (High Priority)**
   - [ ] Create GameCard component with proper styling
   - [ ] Build GameBoard layout
   - [ ] Implement PlayerHand component
   - [ ] Add basic game state visualization

4. **Real-time Features (High Priority)**
   - [ ] Setup WebSocket channels for game rooms
   - [ ] Implement real-time game state synchronization
   - [ ] Create basic chat system with Redis persistence
   - [ ] Add connection status indicators

5. **Score System (Medium Priority)**
   - [ ] Implement complete score calculation logic
   - [ ] Create unit tests for score validation
   - [ ] Build ScoreBoard component
   - [ ] Add end game modal

## Technical Notes

- **State Management**: Zustand with localStorage persistence for game state
- **Validation**: Zod schemas for all game data validation
- **Architecture**: Game logic separated in utilities (`/lib`)
- **Testing**: Unit tests for critical calculations and game logic
- **Components**: React components with minimal local state, using Zustand store
- **Type Safety**: Full TypeScript coverage with strict types
- **UI Framework**: Shadcn/ui components with Tailwind CSS
- **Card Generation**: Deterministic deck creation based on GAME_CONSTANTS
- **Action System**: Immutable state updates with validation at each step
- **Real-time**: Transmit WebSocket for game synchronization and chat
- **Persistence**: Redis for chat history and session management
- **Communication**: Event-driven architecture with typed WebSocket messages

## File Structure

```bash
inertia/
├── lib/
│   ├── types.ts              # All TypeScript interfaces
│   ├── constants.ts          # Game constants
│   ├── schemas.ts            # Zod validation schemas
│   ├── game-logic.ts         # Core game functions
│   ├── score-calculation.ts  # Score calculation utilities
│   └── card-utils.ts         # Card generation and utilities
├── store/
│   └── game-store.ts         # Zustand store with actions
├── components/
│   ├── ui/                   # Shadcn components
│   ├── game-board.tsx         # Main game board
│   ├── game-card.tsx          # Individual card component
│   ├── player-hand.tsx        # Player hand display
│   ├── score-board.tsx        # Score display
│   └── game-status.tsx        # Round/turn indicators
└── pages/
    └── game.tsx              # Main game page
```
