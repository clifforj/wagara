import { Injectable } from '@angular/core';
import Konva from 'konva';
import {SanWeavePatternConfiguration} from './san-weave-pattern-configuration';
import {AbstractPatternService} from '../abstract-pattern.service';

@Injectable({
  providedIn: 'root'
})
export class SanWeaveService extends AbstractPatternService {
  latestConfiguration: SanWeavePatternConfiguration;
  verticalWeave: boolean;

  generateLayer(): Konva.Layer {
    const layer = new Konva.Layer();

    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.latestConfiguration.stageWidth,
      height: this.latestConfiguration.stageHeight,
      fill: this.latestConfiguration.fillColor
    }));

    const gapAndStroke = this.latestConfiguration.strokeWidth + this.latestConfiguration.gapSize;
    const lineLength = gapAndStroke * this.latestConfiguration.stepCount - this.latestConfiguration.gapSize;
    const weaveSize = gapAndStroke * this.latestConfiguration.stepCount;
    const weavesPerRow = Math.ceil(this.latestConfiguration.stageWidth / weaveSize);
    const weavesPerColumn = Math.ceil(this.latestConfiguration.stageHeight / weaveSize);

    let rowStartOrientation;
    for (let x = 0; x < weavesPerRow; x++) {
      rowStartOrientation = this.verticalWeave;

      for (let y = 0; y < weavesPerColumn; y++) {
        layer.add(this.generateWeave(x * weaveSize, y * weaveSize, lineLength, gapAndStroke));
      }

      this.verticalWeave = !rowStartOrientation;
    }

    return layer;
  }

  generateWeave(xPos: number, yPos: number, lineLength: number, gapAndStroke: number): Konva.Group {
    const group = new Konva.Group();

    const startX = xPos + this.latestConfiguration.gapSize;
    const startY = yPos + this.latestConfiguration.gapSize;
    const strokeOffset = this.latestConfiguration.strokeWidth / 2;

    let lineX;
    let lineY;
    let lineXEnd;
    let lineYEnd;
    let offset;
    for (let i = 0; i < this.latestConfiguration.stepCount; i++) {
      offset = i * gapAndStroke + strokeOffset;

      if (this.verticalWeave) {
        lineX = startX + offset;
        lineY = startY;
        lineXEnd = lineX;
        lineYEnd = lineY + lineLength;
      } else {
        lineX = startX;
        lineY = startY + offset;
        lineXEnd = lineX + lineLength;
        lineYEnd = lineY;
      }

      group.add(new Konva.Line({
        points: [lineX, lineY, lineXEnd, lineYEnd],
        closed: false,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth,
        lineCap: 'butt'
      }));
    }

    this.verticalWeave = !this.verticalWeave;

    return group;
  }
}
