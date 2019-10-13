import {Component, OnInit} from '@angular/core';
import Konva from 'konva';
import {WaveService} from '../pattern/wave/wave.service';
import {SanWeaveService} from '../pattern/san-weave/san-weave.service';
import {SanWeavePatternConfiguration} from '../pattern/san-weave/san-weave-pattern-configuration';
import {HexWeaveService} from '../pattern/hex-weave/hex-weave.service';

@Component({
  selector: 'app-canvas-area',
  templateUrl: './canvas-area.component.html',
  styleUrls: ['./canvas-area.component.css']
})
export class CanvasAreaComponent implements OnInit {
  stage: Konva.Stage;

  constructor(private wavePatternService: WaveService,
              private sanWeaveService: SanWeaveService,
              private hexWeaveService: HexWeaveService) {}

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'canvas',
      width: 530,
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

    // const sanWeaveConfig = new SanWeavePatternConfiguration({
    //   stageWidth: this.stage.width(),
    //   stageHeight: this.stage.height(),
    //   stepCount: 3,
    //   fillColor: '#ff8c87',
    //   strokeColor: '#ec3636',
    //   strokeWidth: 19,
    //   gapSize: 10
    // });
    // this.sanWeaveService.setConfig(sanWeaveConfig);
    // const layer = this.sanWeaveService.generateLayer();

    const hexWeaveConfig = new SanWeavePatternConfiguration({
      stageWidth: this.stage.width(),
      stageHeight: this.stage.height(),
      fillColor: '#ff8c87',
      strokeColor: '#ec3636',
      strokeWidth: 3
    });
    this.hexWeaveService.setConfig(hexWeaveConfig);
    const layer = this.hexWeaveService.generateLayer();

    layer.draw();
    this.stage.add(layer);
    console.log(this.stage.toDataURL());

  }
}
