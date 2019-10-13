import {IPatternService} from './pattern.service.interface';
import {IPatternConfiguration} from './pattern-configuration.interface';
import Konva from 'konva';

export abstract class AbstractPatternService implements IPatternService {
  latestConfiguration: IPatternConfiguration;

  abstract generateLayer(): Konva.Layer;

  setConfig(config: IPatternConfiguration) {
    this.latestConfiguration = config;
  }

  getConfig() {
    return this.latestConfiguration;
  }
}
