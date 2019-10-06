import {PatternConfiguration} from '../pattern-configuration.model';

export class WavePatternConfiguration extends PatternConfiguration {
  waveSize: number;
  stepCount: number;
  rows?: number;
  solidRowEvery?: number;
}
