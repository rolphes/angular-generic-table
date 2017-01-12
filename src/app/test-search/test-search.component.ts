import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from '../../generic-table/components/generic-table.component';
import { CustomRowComponent } from '../custom-row/custom-row.component';

@Component({
  selector: 'app-test-search',
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.scss']
})
export class TestSearchComponent implements OnInit {

  private myTable: GenericTableComponent<any, CustomRowComponent>;

  constructor() { }

  ngOnInit() {
  }

  public TestSearch(sValue: string): any
  {
    return this.myTable.gtSearch(sValue);
  }

}

/*
 import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
 import { TextService, TextEntry } from './text.service';
 import { MockBackend, MockConnection } from '@angular/http/testing';
 import {
 ResponseOptions,
 Response,
 Http,
 BaseRequestOptions,
 RequestMethod
 } from '@angular/http';
 import { findIndex, chain, first, last } from 'lodash';
 import { ApiConfigService } from './shared/api-config.service';
 import { ApiConfigMockService } from './shared/mocks/api-config-service.mock';
 import { ApiUserMockService } from './shared/mocks/api-user-service.mock';
 import { ApiUserService, ApiUserServiceIf } from './shared/api-user-service';

 let createTextEntry = (key, text, created, createdBy) => {
 return {
 Key: key,
 Type: last(key.split('#')),
 Name: key.split('#')[1],
 App: first(key.split('#')[0].split('.')[0]),
 Module: first(key.split('#')[0].split('.')[1]),
 Text: text,
 Updated: created,
 UpdatedBy: createdBy
 };
 };

 let createTextRsp = (key, lang, text, created, createdBy) => {
 return {
 groupId: key.split('#')[0],
 labelId: key,
 changed: created,
 changedBy: createdBy,
 language: lang,
 value: text
 };
 };

 let happyGet = (mock, callback = () => {}) => {
 let rsp = [
 createTextRsp('ALL.GENERAL#GENERAL_UPDATE_BUTTON#BUTTON', 'sv', 'Uppdatera', (+ new Date()), 'Me!'),
 createTextRsp('ALL.GENERAL#GENERAL_UPDATE_BUTTON#BUTTON', 'en', 'Update', (+ new Date()), 'Me!'),
 createTextRsp('ALL.GENERAL#ERROR_MAX_DATE#LABEL', 'sv', 'Maxfel', (+ new Date()), 'Me!'),
 createTextRsp('ALL.GENERAL#ERROR_MAX_DATE#LABEL', 'en', 'Max. error', (+ new Date()), 'Me!'),
 createTextRsp('ALL.GENERAL#MIN_BUY_AMOUNT#HEADING', 'sv', 'Köp!', (+ new Date()), 'You'),
 createTextRsp('ALL.GENERAL#MIN_BUY_AMOUNT#HEADING', 'en', 'Buy!', (+ new Date()), 'You')
 ];

 mock.connections
 .filter(connection => connection.request.url.endsWith('/api/v1/label'))
 .subscribe((connection) => {
 connection.mockRespond(new Response(new ResponseOptions({
 body: JSON.stringify(rsp)
 })));
 callback();
 });
 }


 describe('TextService works?', () => {
 beforeEach(() => {
 TestBed.configureTestingModule({
 providers: [
 TextService,
 {
 provide: Http,
 useFactory: (mockBackend, options) => {
 return new Http(mockBackend, options);
 },
 deps: [MockBackend, BaseRequestOptions]
 },
 {
 provide: ApiUserService,
 useFactory: (confService, http): ApiUserServiceIf => {
 return new ApiUserMockService(confService);
 },
 deps: [ApiConfigService, Http]
 },
 MockBackend,
 BaseRequestOptions,
 {
 provide: ApiConfigService,
 useFactory: (http) => {
 return new ApiConfigMockService();
 },
 deps: [Http]
 },
 ]
 });
 });

 it('it should return a list TextEntries with fake async', inject([TextService, MockBackend], fakeAsync((service: TextService, mockBackend: MockBackend) => {
 expect(service).toBeTruthy();

 happyGet(mockBackend);

 let rsp: TextEntry[];
 service.get().subscribe((labels) => {
 rsp = labels;
 }, (error) => {
 console.log(error, 1);
 });
 tick();
 expect(rsp.length).toBe(3);
 })));


 let service: TextService;
 let mockBackend: MockBackend;
 beforeEach(() => {
 service = TestBed.get(TextService);
 mockBackend = TestBed.get(MockBackend);
 });

 it('it should return a list TextEntries with actual async', (done) => {
 expect(service).toBeTruthy();

 happyGet(mockBackend);

 service.get().subscribe((labels) => {
 expect(labels.length).toBe(3);
 done();
 }, (error) => {
 console.log(error, 1);
 }, () => {
 //console.log('');
 }) ;
 });

 it('it should return a list to secondary subscriber with cache', inject([TextService, MockBackend], fakeAsync((service: TextService, mockBackend: MockBackend) => {
 let nbCallsToHttp = 0;

 happyGet(mockBackend, () => {++nbCallsToHttp;});

 let rsp: TextEntry[];
 service.get().subscribe((labels) => {
 rsp = labels;
 }, (error) => {
 console.log(error, 1);
 });
 tick();
 expect(rsp.length).toBe(3);

 service.get().subscribe((labels) => {
 rsp = labels;
 expect(rsp.length).toBe(3);
 });
 tick();
 expect(nbCallsToHttp).toBe(1);
 })));

 it('it should return a list of updated TextEntries when they are updated', inject([TextService, MockBackend], fakeAsync((service: TextService, mockBackend: MockBackend) => {
 happyGet(mockBackend);

 let rsp: TextEntry[];
 service.get().subscribe((labels) => {
 rsp = labels;
 }, (error) => {
 console.log(error, 1);
 });
 tick();
 expect(rsp.length).toBe(3);

 mockBackend.connections.subscribe((connection) => {
 expect(connection.request.url.endsWith('/api/v1/label/batch')).toBe(true);
 expect(JSON.parse(connection.request.getBody()).length).toBe(2);
 connection.mockRespond(new Response(new ResponseOptions({
 body: JSON.stringify({ok: true})
 })));
 });

 let te = TextEntry.Construct('App', 'GENERAL', 'BUTTON', 'UPDATE_BUTTON', 'Uppdatera', 'Update');
 service.save(te).subscribe(rsp2 => {
 //console.log(rsp2);
 }, (error) => {
 console.log(error, 1);
 });
 tick(1);

 expect(rsp.length).toBe(4);
 })));

 it('it should find me a text entry', inject([TextService, MockBackend], fakeAsync((service: TextService, mockBackend: MockBackend) => {
 happyGet(mockBackend);
 let res: TextEntry;
 service.find((te) => te.Key === 'ALL.GENERAL#MIN_BUY_AMOUNT#HEADING').subscribe(rsp => {
 res = rsp;
 });
 tick();
 expect(res.Name).toBe('MIN_BUY_AMOUNT');
 })));

 it('it should get me a new list without a specific entry, when that entry is removed', inject([TextService, MockBackend], fakeAsync((service: TextService, mockBackend: MockBackend) => {
 happyGet(mockBackend);
 let entries;
 service.get().subscribe((labels) => {
 entries = labels;
 }, (error) => {
 console.log(error);
 });
 tick();

 mockBackend.connections.subscribe((connection) => {
 expect(connection.request.url.endsWith('/api/v1/label/batch')).toBe(true);
 expect(JSON.parse(connection.request.getBody()).length).toBe(2);
 connection.mockRespond(new Response(new ResponseOptions({
 body: JSON.stringify({ok: true})
 })));
 });

 let nbEntries = entries.length;
 let keyToDelete = entries[1].Key;
 service.delete(entries[1].Key).subscribe(rsp => { });

 expect(nbEntries).toBe(entries.length + 1);
 expect(entries.find((en) => en.Key === keyToDelete)).toBeUndefined()

 })));


 });

 */
