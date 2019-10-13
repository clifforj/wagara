import Konva from 'konva';
import {IPatternConfiguration} from './pattern-configuration.interface';

export interface IPatternService {
  generateLayer(): Konva.Layer;
  setConfig(config: IPatternConfiguration);
  getConfig(): IPatternConfiguration;
}
