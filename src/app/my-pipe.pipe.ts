import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  constructor() {}

  transform(v_aObjects: any): any[]
  {
    return v_aObjects;
  }

  public getData() : any[]
  {
    var oArr = [
      {
        "id": 1,
        "first_name": "Margaret",
        "last_name": "Cox",
        "email": "mcox0@1688.com",
        "gender": "Female",
        "favorite_color": "#547ab1",
        "birthday": "1980-07-30T03:59:26Z"
      },
      {
        "id": 2,
        "first_name": "Angela",
        "last_name": "Ramos",
        "email": "aramos1@freewebs.com",
        "gender": "Female",
        "favorite_color": "#0acdb2",
        "birthday": "1975-05-02T20:21:32Z"
      },
      {
        "id": 3,
        "first_name": "Jesse",
        "last_name": "Alvarez",
        "email": "jalvarez2@irs.gov",
        "gender": "Male",
        "favorite_color": "#719534",
        "birthday": "1993-01-30T12:56:10Z"
      }
    ];

    return oArr;
  }

  /*
  * Method make it all automatic for fun
  * */

  getRandomLetter(iNum: number): any
  {
    var sRand = this.randomString(iNum);
    console.log(sRand);
    this.dashLetter(sRand);

    return [sRand];
  }

  private randomString(v_iNum: number)
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

    for( var i=0; i < v_iNum; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  private dashLetter(v_string: string): string
  {
    var sDashLett = '';

    for (let i = 0; i < v_string.length; i++) {

      if(v_string[i] === v_string.toUpperCase()[i]) {
        sDashLett += '-'+v_string[i];
      } else {
        sDashLett += v_string[i];
      }

    }

    return 'Test';
  }

}
