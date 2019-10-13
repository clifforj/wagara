import {AbstractPatternConfiguration} from '../abstract-pattern-configuration';

export class WavePatternConfiguration extends AbstractPatternConfiguration {
  waveSize: number;
  stepCount: number;
  rows?: number;
  solidRowEvery?: number;
}
