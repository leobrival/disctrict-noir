/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { GameController } from '../app/controllers/game_controller.js'

// Page d'accueil
router.on('/').renderInertia('home')

// Routes du jeu
router.group(() => {
  // Configuration et règles
  router.get('/setup', [GameController, 'setup']).as('game.setup')
  router.get('/rules', [GameController, 'rules']).as('game.rules')
  
  // Gestion des parties
  router.post('/create', [GameController, 'create']).as('game.create')
  router.post('/:gameId/join', [GameController, 'join']).as('game.join')
  
  // Partie en cours
  router.get('/:gameId', [GameController, 'show']).as('game.show')
  
  // Actions de jeu
  router.post('/:gameId/play-card', [GameController, 'playCard']).as('game.playCard')
  router.post('/:gameId/take-cards', [GameController, 'takeCards']).as('game.takeCards')
  router.post('/:gameId/pass-turn', [GameController, 'passTurn']).as('game.passTurn')
}).prefix('/game')
