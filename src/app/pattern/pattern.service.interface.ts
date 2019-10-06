import Konva from 'konva';
import {PatternConfiguration} from './pattern-configuration.model';

export interface IPatternService {
  latestConfiguration: PatternConfiguration;
  generateLayer(config: PatternConfiguration): Konva.Layer;
}
