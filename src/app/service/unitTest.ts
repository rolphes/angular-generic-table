/**
 * Created by s1781A on 2016-12-27.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceTest {
  test:Array<string>;

  constructor() {
    this.test = ['test1', 'test2', 'test3'];
  }

  getTesting(count:number) {
    var result = [];

    if (count > this.test.length) count = this.test.length;

    for (let i=0; i < count; i++) {
      result.push(this.test[i]);
    }

    return result;
  }

  getString()
  {
    return "Test";
  }
}
