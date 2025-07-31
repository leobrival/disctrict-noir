import { Head, useForm } from '@inertiajs/react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Badge } from '../../components/ui/badge'
import { GAME_CONSTANTS } from '../../types/game'

interface SetupPageProps {
  user?: {
    id: string
    name: string
  }
  availableGames?: Array<{
    id: string
    player1Name: string
    player2Name?: string
    status: 'waiting' | 'in_progress'
    createdAt: string
  }>
}

export default function GameSetupPage({ user, availableGames = [] }: SetupPageProps) {
  const { data, setData, post, processing, errors } = useForm({
    playerName: user?.name || ''
  })

  const handleCreateGame = () => {
    post('/game/create')
  }

  const handleJoinGame = (gameId: string) => {
    post(`/game/${gameId}/join`)
  }

  return (
    <>
      <Head title="District Noir - Configuration" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* En-tête */}
          <Card className="p-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">District Noir</h1>
              <p className="text-lg text-muted-foreground">
                Jeu de cartes tactique pour 2 joueurs
              </p>
              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <span>🎯 {GAME_CONSTANTS.MAX_ROUNDS} tours maximum</span>
                <span>🎴 {GAME_CONSTANTS.INITIAL_HAND_SIZE} cartes en main</span>
                <span>🏛️ {GAME_CONSTANTS.CITY_CARDS_NEEDED} cartes VILLE pour gagner</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Créer une nouvelle partie */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Nouvelle partie</h2>
                  <p className="text-sm text-muted-foreground">
                    Créez une nouvelle partie et attendez qu'un adversaire vous rejoigne
                  </p>
                </div>

                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Joueur:</span>
                      <Badge variant="outline">{user.name}</Badge>
                    </div>
                    
                    <Button 
                      onClick={handleCreateGame}
                      disabled={processing}
                      className="w-full"
                    >
                      {processing ? 'Création...' : '🎮 Créer une partie'}
                    </Button>
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      Vous devez être connecté pour créer une partie
                    </AlertDescription>
                  </Alert>
                )}

                {errors.create && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription>{errors.create}</AlertDescription>
                  </Alert>
                )}
              </div>
            </Card>

            {/* Rejoindre une partie existante */}
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Parties disponibles</h2>
                  <p className="text-sm text-muted-foreground">
                    Rejoignez une partie en attente de joueurs
                  </p>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableGames.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Aucune partie disponible</p>
                      <p className="text-xs mt-1">Créez une nouvelle partie pour commencer</p>
                    </div>
                  ) : (
                    availableGames.map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{game.player1Name}</div>
                          <div className="text-xs text-muted-foreground">
                            Créée {new Date(game.createdAt).toLocaleString('fr-FR')}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={game.status === 'waiting' ? 'outline' : 'secondary'}
                            className="text-xs"
                          >
                            {game.status === 'waiting' ? 'En attente' : 'En cours'}
                          </Badge>
                          
                          {game.status === 'waiting' && user && (
                            <Button
                              size="sm"
                              onClick={() => handleJoinGame(game.id)}
                              disabled={processing}
                            >
                              Rejoindre
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {errors.join && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription>{errors.join}</AlertDescription>
                  </Alert>
                )}
              </div>
            </Card>
          </div>

          {/* Règles rapides */}
          <Card className="p-6">
            <details className="space-y-3">
              <summary className="text-lg font-semibold cursor-pointer">
                📖 Règles rapides
              </summary>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">🎯 Objectif</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Contrôler 3 cartes VILLE 🏛️</li>
                    <li>• OU avoir le plus de points après 4 tours</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">🎴 Types de cartes</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• SOUTIEN 🛡️ (5-8): Majorités</li>
                    <li>• ALLIANCE 🤝 (2-4): Points directs</li>
                    <li>• TRAHISON ⚔️ (1-3): Points directs</li>
                    <li>• VILLE 🏛️: Victoire immédiate</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">⚡ Actions par tour</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 6 actions par joueur</li>
                    <li>• Jouer une carte OU</li>
                    <li>• Prendre max 5 cartes (1x par tour)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">🏆 Scoring SOUTIEN</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Majorité par valeur: +points</li>
                    <li>• Série complète (5,6,7,8): +5 bonus</li>
                  </ul>
                </div>
              </div>
            </details>
          </Card>
        </div>
      </div>
    </>
  )
}