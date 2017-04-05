import { Component, OnInit, Input } from '@angular/core';
import {GenericTableComponent} from '../../generic-table/components/generic-table.component';

@Component({
  selector: 'gt-column-settings',
  templateUrl: './gt-column-settings.component.html',
  styleUrls: ['./gt-column-settings.component.scss']
})
export class GtColumnSettingsComponent implements OnInit {

  @Input() genericTable:GenericTableComponent<any,any>;
  constructor(private dragulaService: DragulaService) {
    /*dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });*/
    dragulaService.drop.subscribe((value) => {
      //console.log(`drop: ${value[0]}`,value);
      this.onDrop(value.slice(1));
    });
    /*dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });*/
  }


  private onDrop(args) {
    let [e, el] = args;
    let objectKey = e.getAttribute('data-object-key');
    let visible = el.getAttribute('data-visible') == 'true';
    console.log(args);
    const order = {};

    for(let i = 0;i < el.children.length;i++) {
      console.log(el.children[i].getAttribute('data-object-key'));
      order[el.children[i].getAttribute('data-object-key')] = i;
    }

    for(let i = 0; i < this.genericTable.gtSettings.length; i++ ) {
      //console.log(this.genericTable.gtSettings[i].objectKey,objectKey)
      this.genericTable.gtSettings[i].columnOrder = order[this.genericTable.gtSettings[i].objectKey];
      if(this.genericTable.gtSettings[i].objectKey === objectKey) {
        this.genericTable.gtSettings[i].visible = visible;
        console.log('match');
        //break;
      }
    }


    //console.log(e,el,args);
    // do something
    this.genericTable.redraw();
  }

  ngOnInit() {
  }

}
import { Pipe, PipeTransform } from '@angular/core';
import {GtConfigSetting} from '../../generic-table/interfaces/gt-config-setting';
import {DragulaService} from "ng2-dragula";


@Pipe({
  name: 'gtColumn'
})
export class GtColumnPipe implements PipeTransform {
  public visible:any;
  public isVisible(visible) {
    return function(column) {
      let value = visible ? (typeof column.visible === 'undefined' || column.visible === true) : column.visible === false;
      console.log(value);
      return value;
    };
  }

  transform(settings: Array<GtConfigSetting>, visible:boolean): Array<GtConfigSetting> {
    this.visible = visible;
    //console.log(visible);
    return settings.filter(this.isVisible(visible));
  }

}
