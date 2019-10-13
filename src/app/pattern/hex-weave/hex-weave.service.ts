import { Injectable } from '@angular/core';
import Konva from 'konva';
import {AbstractPatternService} from '../abstract-pattern.service';
import {AbstractPatternConfiguration} from '../abstract-pattern-configuration';

@Injectable({
  providedIn: 'root'
})
export class HexWeaveService extends AbstractPatternService {
  static HEX_ANGLE = 30;
  latestConfiguration: AbstractPatternConfiguration;

  generateLayer(): Konva.Layer {
    const layer = new Konva.Layer();

    const heightOffset = 50;
    const widthOffset = Math.tan(30 * Math.PI / 180) * heightOffset;
    const baseX = -widthOffset;
    const baseY = -25;
    let xOffset;
    let xPos = baseX;
    let yPos = baseY;

    // to do the / ones
    for (let i = 1; i < 40; i++) {
      if (yPos < this.latestConfiguration.stageHeight) {
        yPos += heightOffset * 2;
      } else {
        xPos += widthOffset * 2;
      }
      xOffset = baseX + widthOffset * i * 2;

      layer.add(new Konva.Line({
        points: [xPos, yPos, xOffset, baseY],
        closed: false,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth,
        lineCap: 'butt'
      }));
    }

    // to do the -- ones
    for (let i = 0; i < 40; i++) {
      layer.add(new Konva.Line({
        points: [baseX, baseY + heightOffset * i, this.latestConfiguration.stageWidth, baseY + heightOffset * i],
        closed: false,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth,
        lineCap: 'butt'
      }));
    }

    const maxX = baseX + Math.ceil((this.latestConfiguration.stageWidth + -baseX) / (widthOffset * 2)) * (widthOffset * 2);
    yPos = baseY - heightOffset;
    xPos = maxX;
    // to do the \ ones
    for (let i = 1; i < 40; i++) {
      if (yPos < this.latestConfiguration.stageHeight) {
        yPos += heightOffset * 2;
      } else {
        xPos -= widthOffset * 2;
      }
      xOffset = maxX - widthOffset * i * 2;

      layer.add(new Konva.Line({
        points: [xPos, yPos, xOffset, baseY - heightOffset],
        closed: false,
        stroke: this.latestConfiguration.strokeColor,
        strokeWidth: this.latestConfiguration.strokeWidth,
        lineCap: 'butt'
      }));
    }

    return layer;
  }
}
