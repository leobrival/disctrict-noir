import { Head, Link } from '@inertiajs/react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { GameCard } from '../../components/game'
import { GAME_CONSTANTS } from '../../types/game'
import type { Card as GameCardType } from '../../types/game'

// Cartes d'exemple pour la démonstration
const exampleCards: GameCardType[] = [
  { id: '1', type: 'SOUTIEN', value: 7 },
  { id: '2', type: 'ALLIANCE', value: 3 },
  { id: '3', type: 'TRAHISON', value: 2 },
  { id: '4', type: 'VILLE', value: 0 }
]

export default function GameRulesPage() {
  return (
    <>
      <Head title="District Noir - Règles du jeu" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* En-tête */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Règles du jeu</h1>
                <p className="text-lg text-muted-foreground">District Noir</p>
              </div>
              <Link href="/game/setup">
                <Button>🎮 Jouer maintenant</Button>
              </Link>
            </div>
          </Card>

          {/* Vue d'ensemble */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🎯 Vue d'ensemble</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                District Noir est un jeu de cartes tactique pour 2 joueurs où vous devez 
                prendre le contrôle d'un quartier criminel en collectant des cartes de soutien, 
                d'alliance et en évitant les trahisons.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">{GAME_CONSTANTS.MAX_ROUNDS}</div>
                  <div className="text-sm text-muted-foreground">Tours max</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-green-600">{GAME_CONSTANTS.INITIAL_HAND_SIZE}</div>
                  <div className="text-sm text-muted-foreground">Cartes en main</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-purple-600">{GAME_CONSTANTS.CITY_CARDS_NEEDED}</div>
                  <div className="text-sm text-muted-foreground">Cartes VILLE pour gagner</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-orange-600">{GAME_CONSTANTS.MAX_LINE_COLLECTION}</div>
                  <div className="text-sm text-muted-foreground">Cartes max à prendre</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Types de cartes */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🎴 Types de cartes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cartes d'exemple */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Exemples</h3>
                <div className="flex gap-2 justify-center">
                  {exampleCards.map((card) => (
                    <GameCard key={card.id} card={card} size="sm" />
                  ))}
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🛡️</span>
                    <Badge variant="soutien">SOUTIEN</Badge>
                    <span className="text-sm text-muted-foreground">(26 cartes, valeurs 5-8)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cartes de majorité. Celui qui a le plus de cartes d'une valeur donnée 
                    gagne les points correspondants. Bonus de 5 points pour une série complète (5,6,7,8).
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤝</span>
                    <Badge variant="alliance">ALLIANCE</Badge>
                    <span className="text-sm text-muted-foreground">(7 cartes, valeurs 2-4)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points directs. Chaque carte rapporte sa valeur en points.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚔️</span>
                    <Badge variant="trahison">TRAHISON</Badge>
                    <span className="text-sm text-muted-foreground">(9 cartes, valeurs 1-3)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points directs. Chaque carte rapporte sa valeur en points.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🏛️</span>
                    <Badge variant="ville">VILLE</Badge>
                    <span className="text-sm text-muted-foreground">(3 cartes)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cartes de victoire immédiate. Contrôlez 3 cartes VILLE pour gagner instantanément.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Déroulement du jeu */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">⚡ Déroulement du jeu</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">🎲 Mise en place</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Chaque joueur reçoit 5 cartes</li>
                  <li>• 3 cartes sont retirées du jeu</li>
                  <li>• 2 cartes forment la ligne centrale</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">🔄 Tour de jeu</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Chaque joueur a 6 actions par tour</li>
                  <li>• <strong>Action 1:</strong> Jouer une carte de sa main sur la ligne</li>
                  <li>• <strong>Action 2:</strong> Prendre jusqu'à 5 cartes de la ligne (1 fois par tour)</li>
                  <li>• Le tour se termine quand tous les joueurs ont épuisé leurs actions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">📥 Collection de cartes</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Vous ne pouvez prendre que les 5 dernières cartes de la ligne</li>
                  <li>• Une fois par tour maximum</li>
                  <li>• Les cartes collectées vont dans votre zone personnelle</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Conditions de victoire */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🏆 Conditions de victoire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">🏛️ Victoire immédiate</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Le premier joueur à contrôler 3 cartes VILLE gagne immédiatement la partie.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">🎯 Victoire aux points</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Après 4 tours, le joueur avec le plus de points gagne.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">📊 Calcul des points</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span><strong>🛡️ SOUTIEN:</strong> Majorités par valeur</span>
                  <span className="text-blue-600">Variable</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span><strong>🛡️ SOUTIEN:</strong> Série complète (5,6,7,8)</span>
                  <span className="text-blue-600">+5 bonus</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span><strong>🤝 ALLIANCE:</strong> Points directs</span>
                  <span className="text-green-600">Valeur de la carte</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span><strong>⚔️ TRAHISON:</strong> Points directs</span>
                  <span className="text-red-600">Valeur de la carte</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stratégies */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">🧠 Conseils stratégiques</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600">✅ À faire</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Surveillez les cartes VILLE de votre adversaire</li>
                  <li>• Visez les majorités SOUTIEN rentables</li>
                  <li>• Collectez au bon moment pour maximiser vos gains</li>
                  <li>• Gardez des cartes ALLIANCE/TRAHISON pour les points</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-red-600">❌ À éviter</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Ne laissez pas l'adversaire collectionner 3 VILLE</li>
                  <li>• N'oubliez pas votre collection hebdomadaire</li>
                  <li>• Ne négligez pas les petites valeurs SOUTIEN</li>
                  <li>• Ne jouez pas toutes vos bonnes cartes trop tôt</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="text-center">
            <Link href="/game/setup">
              <Button size="lg" className="px-8">
                🎮 Commencer une partie
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}