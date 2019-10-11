import {Component, OnInit} from '@angular/core';
import Konva from 'konva';
import {WaveService} from '../pattern/wave/wave.service';
import {SanWeaveService} from '../pattern/san-weave/san-weave.service';

@Component({
  selector: 'app-canvas-area',
  templateUrl: './canvas-area.component.html',
  styleUrls: ['./canvas-area.component.css']
})
export class CanvasAreaComponent implements OnInit {
  stage: Konva.Stage;

  constructor(private wavePatternService: WaveService, private sanWeaveService: SanWeaveService) {}

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: 500,
      height: 500
    });

    /*const layer = this.wavePatternService.generateLayer({
      stageWidth: this.stage.width(),
      stageHeight: this.stage.height(),
      waveSize: 50,
      stepCount: 8,
      fillColor: '#bed1ff',
      strokeColor: '#ffffff',
      strokeWidth: 2,
      solidRowEvery: 2
    });*/

    const layer = this.sanWeaveService.generateLayer({
      stageWidth: this.stage.width(),
      stageHeight: this.stage.height(),
      stepCount: 3,
      fillColor: '#ff8c87',
      strokeColor: '#ec3636',
      strokeWidth: 19,
      gapSize: 10
    });

    layer.draw();
    this.stage.add(layer);

  }
}
