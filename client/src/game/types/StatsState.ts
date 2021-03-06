import { PaceRisk } from './GameState';

export default interface StatsState {
  readonly maxScore: number;
  readonly doubleDiscard: boolean;
  readonly potentialCluesLost: number;
  readonly efficiency: number;
  readonly pace: number | null;
  readonly paceRisk: PaceRisk;
}
