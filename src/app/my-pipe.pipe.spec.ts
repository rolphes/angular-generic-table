/* tslint:disable:no-unused-variable */
//import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { StaticComponent } from './static/static.component';
import { GtTexts } from './../generic-table/interfaces/gt-texts';
import { GtChunkPipe } from './../generic-table/pipes/gt-chunk.pipe';
import { GtSearchPipe } from './../generic-table/pipes/gt-search.pipe';
import { DashCasePipe } from './../generic-table/pipes/dash-case.pipe';
import { GtFilterPipe } from './../generic-table/pipes/gt-filter.pipe';
import { GtVisiblePipe } from './../generic-table/pipes/gt-visible.pipe';
import { GtOrderByPipe } from './../generic-table/pipes/gt-order-by.pipe';
import { GtInformation } from "./../generic-table/interfaces/gt-information";
import { GtPropertyPipe } from './../generic-table/pipes/gt-property.pipe';
import { TableInfoPipe } from './../generic-table/components/gt-table-info.component';
import { PaginationPipe } from './../generic-table/components/gt-pagination.component';

describe('gt-table-info.component.ts', () => {
  let oTableInfoPipe = new TableInfoPipe();
  let sInfoTable = 'Information about table (tableInfo)';

  it('Should take out information from tableInfo', function() {
    let e_oTableInfoPipe = oTableInfoPipe.transform({tableInfo: sInfoTable , tableInfoAfterSearch: 'Testing table info after search (tableInfoAfterSearch)'} as GtTexts, { recordsAll: 1, recordsAfterSearch:1 } as GtInformation ,1);
    expect(oTableInfoPipe.transform).toBeDefined();
    expect(e_oTableInfoPipe).toEqual(sInfoTable);
  });

  it('Should take out information about table if recordsAll == to recordAfterSearch', function() {
    let sTableInfoAfterSearch = 'Testing second time (tableInfoAfterSearch)';
    let e_oTableInfoPipe = oTableInfoPipe.transform({tableInfo: sInfoTable , tableInfoAfterSearch: sTableInfoAfterSearch} as GtTexts, { recordsAll: 100, recordsAfterSearch: 50 } as GtInformation, null);
    expect(e_oTableInfoPipe).toEqual(sTableInfoAfterSearch);
  });

  it("Should check so it doesn't run let searchString" , function() {
    let e_oTableInfoPipe = oTableInfoPipe.transform({tableInfo: 'tableInfo' , tableInfoAfterSearch: 'tableInfoAfterSearch'} as GtTexts, { recordsAll: null , recordsAfterSearch: null } as GtInformation, null);
    expect(e_oTableInfoPipe).toEqual('tableInfo');
  });

});

describe('gt-pagination.component.ts', () => {

  /*
  * last if doesn't run at all, bug?
  * */

  /*
   * Should it be allowed to take in null in parameters, null = to first if
   * */

  let oPaginationPipe = new PaginationPipe;

  let oiPages = {
    Pages_1: { desc: 'take out one result if less than two pages', totalPages: 1, currentPage: 10, contain: [1] },
    Pages_2: { desc: 'take out two result if less than three pages', totalPages: 2, currentPage: 1, contain: [1,2] },
    Pages_3: { desc: 'take out three result if less than four pages', totalPages: 3, currentPage: 2, contain: [1,2,3] },
    Pages_4: { desc: 'take out four result if less than five pages', totalPages: 4, currentPage: 2, contain: [1,2,3,4] },
    Pages_5: { desc: 'take out five result if current page is one of the four first pages', totalPages: 5, currentPage: 1, contain: [1,2,3,4,5] },
    Pages_6: { desc: 'take out three result if next to last page)', totalPages: 6, currentPage: 6, contain: [4,5,6] },
    Pages_7: { desc: 'take out three result if next to next last page', totalPages: 12, currentPage: 6, contain: [5,6,7]},
    Pages_8: { desc: 'take out three result if there is more than one page left', totalPages: 20, currentPage: 18, contain: [17,18,19]},
    Pages_9: { desc: 'take out three result if last page', totalPages: 15, currentPage: 15, contain: [13,14,15] },
    Pages_10: { desc: 'take out three result if next to last page', totalPages: 12, currentPage: 11, contain: [9,10,11]},
    Pages_11: { desc: 'take out three result if next to last page', totalPages: 5, currentPage: 5, contain: [2,3,4,5]},
  };

  for (let i in oiPages) {
    let soiPages = oiPages[i];

    it('Should '+soiPages.desc, function() {
      expect(oPaginationPipe.transform(soiPages.totalPages, soiPages.currentPage)).toEqual(soiPages.contain);
    });
  }

  it('Should return back one page (null is null)', function() {
    expect(oPaginationPipe.transform(null, null)).toContain(1);
  });

  it('Should return back pages one to five', function() {
    expect(oPaginationPipe.transform(10, null)).toEqual([1,2,3,4,5]);
  });

  it('Should take back one (null, 50)', function() {
    expect(oPaginationPipe.transform(null, 50)).toContain(1);
  });

});

describe('dash-case.pipe.ts:', () => {
  let oDashpipe = new DashCasePipe;

  it('Should get a dash between small and big letters ', () => {
    let oDash = {
      'testDash': 'test-dash',
      'testDash-TeStdAsShing': 'test-dash-te-std-as-shing',
      'testDa-shDash-DashDas-h-': 'test-da-sh-dash-dash-das-h-',
      'TestDash?DashtestDash--Dash' : 'test-dash?dashtest-dash--dash'
    };

    expect(oDashpipe.transform).toBeDefined();
    for(let i in oDash) expect(oDashpipe.transform(i)).toEqual(oDash[i]);
  });
});

describe('gt-chunk.pipe.ts:', () => {
  it('gt-chunk.pipe.ts: should compare arrays to have an existing object', () => {
    let EventE = new EventEmitter;
    let oGtChunkPipe = new GtChunkPipe;
    let oStaticComponent = new StaticComponent;
    let aoGtChunkPipe = oGtChunkPipe.transform(oStaticComponent.configObject.data, {pageCurrent: 1, recordLength: 3, recordsAll: 3, recordsAfterFilter: 1, recordsAfterSearch: 1}, 30, 1, false, 1, EventE, { exportData: [{exportData: 'Testing export data'}] });

    expect(oGtChunkPipe.transform).toBeDefined();
    expect(aoGtChunkPipe).toContain({id: 1, name: "Anna", lucky_number: 63});
    expect(aoGtChunkPipe).toContain({id: 9, name: "Martha", lucky_number: 57});
  });
});

describe('gt-filter.pipe.ts:', () => {
  let oGtFilterPipe = new GtFilterPipe;
  let oStaticComponent = new StaticComponent;
  let aoData = [[{Filter: 'Test', Filter2: 'Test8'}], [{Filter: 'Test test', Filter2: 'Test8'}]];

  it('Should get out ARRAY of objects, values not match = false result = []', function() {
    expect(oGtFilterPipe.transform).toBeDefined();

    for (let i = 0; i < aoData.length; i++) {
      let oGtFilterPipeTransform = oGtFilterPipe.transform(aoData[i], { Filter: 'Test', Filter2: 'Test8'}, {pageCurrent: 1, recordLength: 3, recordsAll: 3, recordsAfterFilter: 1, recordsAfterSearch: 1}, true, 7);
      oGtFilterPipeTransform.length > 0 ? expect(oGtFilterPipeTransform).toContain({Filter: 'Test', Filter2: 'Test8'}) : expect(oGtFilterPipeTransform).toEqual([]);
    }
  });

  it('Should filter in values and take out Frank and Anna', function() {
    let e_oGtFilterPipe = oGtFilterPipe.transform(oStaticComponent.configObject.data, { name: ['Frank', 'Anna']}, { pageCurrent: 1, recordLength: 3, recordsAll: 100, recordsAfterFilter: 4, recordsAfterSearch: 4 }, true, 1);
    expect(e_oGtFilterPipe).toContain({id: 12, name: 'Frank', lucky_number: 27});
  });

  it('Should take out whole value and not filter out any data', function() {
    let uUndefind = undefined;
    let e_oGtFilterPipe = oGtFilterPipe.transform(oStaticComponent.configObject.data, uUndefind, { pageCurrent: 1, recordLength: 3, recordsAll: 100, recordsAfterFilter: 1, recordsAfterSearch: 1 }, true, 1);
    expect(e_oGtFilterPipe.length).not.toBe(0);
  })

});

describe('gt-order-by-pipe.ts:', () => {
  let oGtOrderByPipe = new GtOrderByPipe();

  it('Should get out similar objects', function() {
    let e_oGtOrderByPipe = oGtOrderByPipe.transform([{ Data: 'DataTest', Data2: 'DataTest'}], ['Testkey'], [{name: 'TestName', objectKey: 'Testkey',}], true, 6);
    expect(oGtOrderByPipe.transform).toBeDefined();
    expect(e_oGtOrderByPipe).toContain({ Data: 'DataTest', Data2: 'DataTest'})
  });

  it('Should get single string', function() {
    let e_oGtOrderByPipe = oGtOrderByPipe.transform('DataTest', ['Testkey'], [{name: 'TestName', objectKey: 'Testkey',}], true, 6);
    expect(e_oGtOrderByPipe).toEqual('DataTest');
  });

  it('Should get out nothing', function() {
    let e_oGtOrderByPipe = oGtOrderByPipe.transform(null, ['Testkey'], [{name: 'TestName', objectKey: 'Testkey',}], true, 6);
    expect(e_oGtOrderByPipe).toBe(null);
  });

});

describe('gt-property-by.pipe.ts', () => {
  let oGtPropertyPipe = new GtPropertyPipe;

  it('Should be Equal to each others', function() {
    let e_oGtPropertyPipe = oGtPropertyPipe.transform([{name: 'TestConfig', objectKey: 'TestConfig'}], 'TestConfig', 'name');
    expect(oGtPropertyPipe.transform).toBeDefined();
    expect(e_oGtPropertyPipe).toEqual('TestConfig');
  });

});

describe('GtVisiblePipe:', () => {
  let oGtVisiblePipe = new GtVisiblePipe();

  it('Should get out name and objectkey', () => {
    let e_oGtVisiblePipe = oGtVisiblePipe.transform([{name: 'TestVisibleMethod', objectKey: 'TestKey'}], [{objectKey: 'TestKey', visible: true, enabled: true, columnOrder: 1}]);
    expect(oGtVisiblePipe.transform).toBeDefined();
    expect(e_oGtVisiblePipe).toContain({ name: 'TestVisibleMethod', objectKey: 'TestKey'});
  });

});

describe('gt-search.pipe',() => {

  let oGtSearchPipe = new GtSearchPipe;
  let oStaticComponent = new StaticComponent;

  it('Should return a search result from list from static component', () => {
    let e_OGtSearchPipe = oGtSearchPipe.transform(oStaticComponent.configObject.data, 'Anna', { pageCurrent: 1, recordLength: 1, recordsAll: 1, recordsAfterFilter: 1} as GtInformation,[{objectKey: 'name'}], [{name: 'Anna', objectKey: 'name'}], 1);
    expect(e_OGtSearchPipe).toBeDefined();
    expect(e_OGtSearchPipe).toContain({id: 1, name: 'Anna', lucky_number: 63});
    expect(e_OGtSearchPipe).not.toBe([]);
  });

  it('Should fail result = nothing (Multidimensional search does not work)', () => {
    let e_OGtSearchPipe = oGtSearchPipe.transform([oStaticComponent.configObject.data], 'Anna', { pageCurrent: 1, recordLength: 1, recordsAll: 1, recordsAfterFilter: 1} as GtInformation,[{objectKey: 'name'}], [{name: 'Anna', objectKey: 'name'}], 1);
    expect(e_OGtSearchPipe).toEqual([]);
  });
});
