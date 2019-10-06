import { Injectable } from '@angular/core';
import Konva from 'konva';
import {IPatternService} from '../pattern.service.interface';
import {WavePatternConfiguration} from './wave-pattern-configuration';

@Injectable({
  providedIn: 'root'
})
export class WaveService implements IPatternService {
  static ARC_ANGLE = 120;
  static ARC_ROTATION = -150;
  static ARC_OFFSET_ANGLE = (180 - WaveService.ARC_ANGLE) / 2;

  latestConfiguration: WavePatternConfiguration;

  generateLayer(config: WavePatternConfiguration): Konva.Layer {
    const layer = new Konva.Layer();

    if (config) {
      this.latestConfiguration = config;
    }

    const rows = this.getRows();
    const wavesPerOddRow = Math.ceil(this.latestConfiguration.stageWidth / this.getWaveWidth());
    const wavesPerEvenRow = wavesPerOddRow + 2;
    const stepSize = this.latestConfiguration.waveSize / this.latestConfiguration.stepCount;

    let isOddRow;
    let isStrokeRow;
    let waveCount;
    let wave: Konva.Group;
    for (let y = 0; y < rows; y++) {
      isOddRow = !!(y % 2);
      isStrokeRow = this.isStrokeRow(y);
      waveCount = isOddRow ? wavesPerOddRow : wavesPerEvenRow;

      for (let x = 0; x < waveCount; x++) {
        if (isStrokeRow) {
          wave = this.createStrokeWave((this.getWaveWidth() * x) + (this.getWaveWidth() / 2 * isOddRow),
            this.latestConfiguration.stageHeight - this.getWaveEdgeHeight() * (y - 1));
        } else {
          wave = this.createWave(
            (this.getWaveWidth() * x) + (this.getWaveWidth() / 2 * isOddRow),
            this.latestConfiguration.stageHeight - this.getWaveEdgeHeight() * (y - 1),
            stepSize
          );
        }

        layer.add(wave);
        wave.moveToBottom();
      }
    }

    return layer;
  }

  private isStrokeRow(y: number) {
    return this.latestConfiguration.solidRowEvery ? !((y + 1) % (this.latestConfiguration.solidRowEvery + 1)) : false;
  }

  private getRows() {
    return this.latestConfiguration.rows || Math.ceil(this.latestConfiguration.stageHeight / this.getWaveEdgeHeight()) + 2;
  }

  createWave(xPos: number, yPos: number, stepSize: number): Konva.Group {
    const group = new Konva.Group();

    for (let i = 0; i < this.latestConfiguration.stepCount; i++) {
      group.add(new Konva.Arc({
        x: xPos,
        y: yPos,
        innerRadius: stepSize * i,
        outerRadius: stepSize * (i + 1),
        angle: WaveService.ARC_ANGLE,
        rotation: WaveService.ARC_ROTATION,
        fill: this.latestConfiguration.fillColor,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth
      }));
    }

    return group;
  }

  createStrokeWave(xPos: number, yPos: number): Konva.Group {
    const group = new Konva.Group();

    for (let i = 0; i < this.latestConfiguration.stepCount; i++) {
      group.add(new Konva.Arc({
        x: xPos,
        y: yPos,
        innerRadius: 0,
        outerRadius: this.latestConfiguration.waveSize,
        angle: WaveService.ARC_ANGLE,
        rotation: WaveService.ARC_ROTATION,
        fill: this.latestConfiguration.strokeColor,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth
      }));
    }

    return group;
  }

  getWaveEdgeHeight(): number {
    return Math.sin(WaveService.ARC_OFFSET_ANGLE * Math.PI / 180) * this.latestConfiguration.waveSize;
  }

  getWaveWidth() {
    return (Math.cos(WaveService.ARC_OFFSET_ANGLE * Math.PI / 180) * this.latestConfiguration.waveSize) * 2;
  }
}
