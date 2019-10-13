import {IPatternConfiguration} from './pattern-configuration.interface';

export abstract class AbstractPatternConfiguration implements IPatternConfiguration {
  fillColor: string;
  stageHeight: number;
  stageWidth: number;
  strokeColor: string;
  strokeWidth: number;

  constructor(properties?: object) {
    Object.assign(this, properties);
  }
}
