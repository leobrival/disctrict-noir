import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { Player, ScoreBreakdown, VictoryResult } from '../../types/game'
import { GAME_CONSTANTS } from '../../types/game'

interface ScoreBoardProps {
  players: [Player, Player]
  playerNames: [string, string]
  currentRound: number
  scores?: [ScoreBreakdown, ScoreBreakdown]
  victoryResult?: VictoryResult
  className?: string
}

const calculateCityCards = (player: Player) => {
  return player.collectedCards.filter(card => card.type === 'VILLE').length
}

const formatScoreBreakdown = (score: ScoreBreakdown) => {
  const details = []
  
  if (Object.keys(score.soutienMajorities).length > 0) {
    const majoritiesText = Object.entries(score.soutienMajorities)
      .map(([value, points]) => `${value}: +${points}`)
      .join(', ')
    details.push(`Majorités SOUTIEN (${majoritiesText})`)
  }
  
  if (score.soutienBonus > 0) {
    details.push(`Bonus série complète: +${score.soutienBonus}`)
  }
  
  if (score.alliancePoints > 0) {
    details.push(`ALLIANCE: +${score.alliancePoints}`)
  }
  
  if (score.trahisonPoints > 0) {
    details.push(`TRAHISON: +${score.trahisonPoints}`)
  }
  
  return details
}

export function ScoreBoard({ 
  players, 
  playerNames, 
  currentRound, 
  scores,
  victoryResult,
  className 
}: ScoreBoardProps) {
  const [player1, player2] = players
  const [name1, name2] = playerNames
  
  const cityCards1 = calculateCityCards(player1)
  const cityCards2 = calculateCityCards(player2)
  
  return (
    <Card className={cn('p-4', className)}>
      <div className="space-y-4">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tableau de scores</h3>
          <Badge variant="outline">
            Tour {currentRound}/{GAME_CONSTANTS.MAX_ROUNDS}
          </Badge>
        </div>

        {/* Résultat de victoire */}
        {victoryResult?.hasWinner && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-center">
              🎉 <strong>
                {victoryResult.winnerId === player1.id ? name1 : name2}
              </strong> remporte la partie !
              {victoryResult.condition === 'CITY_CARDS' ? (
                <span className="block text-sm mt-1">
                  Victoire par contrôle de {GAME_CONSTANTS.CITY_CARDS_NEEDED} cartes VILLE 🏛️
                </span>
              ) : (
                <span className="block text-sm mt-1">
                  Victoire aux points: {victoryResult.winnerScore} vs {victoryResult.loserScore}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Scores des joueurs */}
        <div className="grid grid-cols-2 gap-4">
          {/* Joueur 1 */}
          <div className={cn(
            'p-3 rounded-lg border-2',
            victoryResult?.winnerId === player1.id 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-200'
          )}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{name1}</h4>
              {scores && (
                <Badge variant="outline" className="text-lg font-bold">
                  {scores[0].total}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Cartes VILLE 🏛️</span>
                <span className={cn(
                  'font-semibold',
                  cityCards1 >= GAME_CONSTANTS.CITY_CARDS_NEEDED ? 'text-green-600' : ''
                )}>
                  {cityCards1}/{GAME_CONSTANTS.CITY_CARDS_NEEDED}
                </span>
              </div>
              
              {scores && formatScoreBreakdown(scores[0]).map((detail, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  {detail}
                </div>
              ))}
            </div>
          </div>

          {/* Joueur 2 */}
          <div className={cn(
            'p-3 rounded-lg border-2',
            victoryResult?.winnerId === player2.id 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-200'
          )}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{name2}</h4>
              {scores && (
                <Badge variant="outline" className="text-lg font-bold">
                  {scores[1].total}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Cartes VILLE 🏛️</span>
                <span className={cn(
                  'font-semibold',
                  cityCards2 >= GAME_CONSTANTS.CITY_CARDS_NEEDED ? 'text-green-600' : ''
                )}>
                  {cityCards2}/{GAME_CONSTANTS.CITY_CARDS_NEEDED}
                </span>
              </div>
              
              {scores && formatScoreBreakdown(scores[1]).map((detail, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conditions de victoire */}
        {!victoryResult?.hasWinner && (
          <div className="text-center text-sm text-muted-foreground">
            <p>🏛️ Première à {GAME_CONSTANTS.CITY_CARDS_NEEDED} cartes VILLE ou 🎯 meilleur score après {GAME_CONSTANTS.MAX_ROUNDS} tours</p>
          </div>
        )}
      </div>
    </Card>
  )
}