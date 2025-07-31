import type { HttpContext } from '@adonisjs/core/http'
import { Deck } from '../game/deck.js'
import { Player } from '../game/player.js'
import { GameLine } from '../game/game_line.js'
import { ScoreCalculator } from '../game/score_calculator.js'
import { VictoryChecker } from '../game/victory_checker.js'
import { GAME_CONSTANTS } from '../game/constants.js'
import type { GameState, GamePhase, ActionType } from '../game/types.js'

export class GameController {
  /**
   * Affiche la page de configuration du jeu
   */
  async setup({ inertia }: HttpContext) {
    // Utilisateur démo pour les tests
    const demoUser = { id: 'demo-user-1', name: 'Joueur Démo' }
    
    // TODO: Récupérer les parties disponibles depuis la base de données
    const availableGames = [
      // Exemple de données - à remplacer par des vraies données DB
      {
        id: 'demo-game-1',
        player1Name: 'Alice',
        player2Name: null,
        status: 'waiting' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: 'demo-game-2',
        player1Name: 'Bob',
        player2Name: null,
        status: 'waiting' as const,
        createdAt: new Date().toISOString()
      }
    ]

    return inertia.render('game/setup', {
      user: demoUser,
      availableGames
    })
  }

  /**
   * Affiche les règles du jeu
   */
  async rules({ inertia }: HttpContext) {
    return inertia.render('game/rules')
  }

  /**
   * Crée une nouvelle partie
   */
  async create({ response, session }: HttpContext) {
    try {
      // Générer un ID de partie démo
      const gameId = `demo-game-${Date.now()}`
      
      // TODO: Sauvegarder en session ou DB
      session.put('current_game_id', gameId)
      
      return response.redirect(`/game/${gameId}`)
    } catch (error) {
      session.flash('errors', { create: 'Erreur lors de la création de la partie' })
      return response.redirect('/game/setup')
    }
  }

  /**
   * Rejoindre une partie existante
   */
  async join({ params, response, session }: HttpContext) {
    const { gameId } = params

    try {
      // TODO: Vérifier que la partie existe et est disponible
      // TODO: Ajouter le joueur à la partie
      
      session.put('current_game_id', gameId)
      return response.redirect(`/game/${gameId}`)
    } catch (error) {
      session.flash('errors', { join: 'Impossible de rejoindre cette partie' })
      return response.redirect('/game/setup')
    }
  }

  /**
   * Affiche une partie en cours
   */
  async show({ params, inertia }: HttpContext) {
    const { gameId } = params
    
    // Utilisateur démo pour les tests
    const demoUserId = 'demo-user-1'

    try {
      // TODO: Récupérer l'état de la partie depuis la DB
      // Pour l'instant, on crée un état de jeu de démonstration
      const gameState = this.createDemoGameState(demoUserId)
      
      const playerNames: [string, string] = [
        'Joueur 1 (Vous)', 
        'Joueur 2 (Démo)'
      ]

      // Calculer les scores
      const scoreCalculator = new ScoreCalculator()
      const scores = scoreCalculator.calculateScores(gameState.players) as [any, any]

      // Vérifier les conditions de victoire
      const victoryChecker = new VictoryChecker()
      const victoryResult = victoryChecker.checkImmediateVictory(gameState.players)

      return inertia.render('game/index', {
        gameState,
        playerNames,
        currentPlayerId: demoUserId,
        scores,
        victoryResult: victoryResult.hasWinner ? victoryResult : undefined
      })
    } catch (error) {
      console.error('Erreur lors du chargement de la partie:', error)
      return response.redirect('/game/setup')
    }
  }

  /**
   * Jouer une carte
   */
  async playCard({ params, request, response, session }: HttpContext) {
    const { gameId } = params
    const { cardId } = request.only(['cardId'])

    try {
      // TODO: Récupérer l'état de la partie
      // TODO: Valider l'action
      // TODO: Appliquer l'action avec les classes de jeu
      // TODO: Sauvegarder le nouvel état
      // TODO: Diffuser via WebSocket si nécessaire

      session.flash('success', 'Carte jouée avec succès')
      return response.redirect(`/game/${gameId}`)
    } catch (error) {
      session.flash('errors', { action: 'Impossible de jouer cette carte' })
      return response.redirect(`/game/${gameId}`)
    }
  }

  /**
   * Prendre des cartes de la ligne
   */
  async takeCards({ params, response, session }: HttpContext) {
    const { gameId } = params

    try {
      // TODO: Récupérer l'état de la partie
      // TODO: Valider l'action (peut collecter, n'a pas déjà collecté ce tour)
      // TODO: Appliquer l'action avec GameLine.collectCards()
      // TODO: Sauvegarder le nouvel état
      // TODO: Diffuser via WebSocket

      session.flash('success', 'Cartes collectées avec succès')
      return response.redirect(`/game/${gameId}`)
    } catch (error) {
      session.flash('errors', { action: 'Impossible de collecter ces cartes' })
      return response.redirect(`/game/${gameId}`)
    }
  }

  /**
   * Passer son tour
   */
  async passTurn({ params, response, session }: HttpContext) {
    const { gameId } = params

    try {
      // TODO: Récupérer l'état de la partie
      // TODO: Passer au joueur suivant
      // TODO: Vérifier fin de tour/partie
      // TODO: Sauvegarder le nouvel état

      return response.redirect(`/game/${gameId}`)
    } catch (error) {
      session.flash('errors', { action: 'Impossible de passer le tour' })
      return response.redirect(`/game/${gameId}`)
    }
  }

  /**
   * Crée un état de jeu de démonstration pour les tests
   */
  private createDemoGameState(currentUserId: string): GameState {
    // Créer un deck et distribuer les cartes
    const deck = new Deck()
    deck.shuffle()
    
    // Créer les joueurs
    const player1 = new Player(currentUserId)
    const player2 = new Player('demo-player-2')
    
    // Distribuer les mains initiales
    for (let i = 0; i < GAME_CONSTANTS.INITIAL_HAND_SIZE; i++) {
      const cards1 = deck.dealCards(1)
      const cards2 = deck.dealCards(1)
      if (cards1.length > 0) player1.addToHand(cards1)
      if (cards2.length > 0) player2.addToHand(cards2)
    }

    // Créer la ligne de jeu
    const gameLine = new GameLine()
    
    // Ajouter 2 cartes initiales à la ligne
    const initialCards = deck.dealCards(2)
    if (initialCards.length > 0) {
      initialCards.forEach(card => gameLine.addCard(card))
    }

    // Simuler quelques cartes collectées pour la démonstration
    const demoCards = deck.dealCards(2)
    if (demoCards.length >= 2) {
      player1.collectedCards.push(demoCards[0])
      player2.collectedCards.push(demoCards[1])
    }

    return {
      players: [player1, player2],
      line: gameLine.getCards(),
      currentRound: 1,
      currentPlayer: 0,
      actionCount: [0, 0],
      gamePhase: 'PLAYING' as GamePhase,
      winner: undefined
    }
  }
}