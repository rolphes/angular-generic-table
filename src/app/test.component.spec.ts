/* tslint:disable:no-unused-variable */
import { HttpModule, Http } from '@angular/http';
import { RestComponent } from './rest/rest.component';
import { StaticComponent } from './static/static.component';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { GtSearchPipe } from "./../generic-table/pipes/gt-search.pipe";
import { GtRenderPipe } from './../generic-table/pipes/gt-render.pipe';
import { GtVisiblePipe } from "./../generic-table/pipes/gt-visible.pipe";
import { DashCasePipe } from "./../generic-table/pipes/dash-case.pipe";
import { GtPropertyPipe } from "./../generic-table/pipes/gt-property.pipe";
import { GtChunkPipe } from "./../generic-table/pipes/gt-chunk.pipe";
import { GtFilterPipe } from "./../generic-table/pipes/gt-filter.pipe";
import { GtOrderByPipe } from "./../generic-table/pipes/gt-order-by.pipe";
import { GenericTableComponent } from './../generic-table/components/generic-table.component';
import { ComponentAnchorDirective } from './../generic-table/directives/component-anchor.directive';
import { GtPaginationComponent, PaginationPipe } from './../generic-table/components/gt-pagination.component';
import { GtTableInfoComponent, TableInfoPipe } from './../generic-table/components/gt-table-info.component';
import { GtExpandingRowComponent } from './../generic-table/components/gt-expanding-row.component';
import { ExamplesComponent } from './examples/examples.component';
import { LazyComponent } from './lazy/lazy.component';
import { FormsModule } from '@angular/forms';

describe('static.component.ts', () => {
  let fixture: any;
  let component: any;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaticComponent,
        ComponentAnchorDirective,
        GenericTableComponent,
        GtPaginationComponent,
        GtVisiblePipe,
        GtRenderPipe,
        DashCasePipe,
        GtPropertyPipe,
        GtChunkPipe,
        GtFilterPipe,
        GtOrderByPipe,
        GtSearchPipe,
        PaginationPipe,
        GtTableInfoComponent,
        TableInfoPipe,
        GtExpandingRowComponent,
      ],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement
  });

  it('Track component', () => {
    expect(component).toBeDefined();
  });

  it('Should check so configData has values', () => {
    expect(component.configObject.data).toContain({id: 14, name: '?Fr', lucky_number: 28});
    expect(component.configObject.data).toContain({id: 98, name: 'Virginia', lucky_number: 20 });
  });

  it('Track generic-table tag and check first h3 tag = Basic', () => {
    expect(compiled.querySelector('h3').textContent).toEqual('Basic');
    expect(compiled.querySelector('generic-table')).not.toBe(null);
  });

});

describe('examples.component.ts', () => {
  let fixture: any;
  let component: any;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaticComponent,
        RestComponent,
        LazyComponent,
        ExamplesComponent,
        ComponentAnchorDirective,
        GenericTableComponent,
        GtPaginationComponent,
        GtVisiblePipe,
        GtRenderPipe,
        DashCasePipe,
        GtPropertyPipe,
        GtChunkPipe,
        GtFilterPipe,
        GtOrderByPipe,
        GtSearchPipe,
        PaginationPipe,
        GtTableInfoComponent,
        TableInfoPipe,
        GtExpandingRowComponent,
      ],
      imports: [FormsModule, HttpModule],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement
  });

  it('Track component to be called', () => {
    expect(component).toBeDefined();
    expect(compiled.querySelector('app-static')).not.toBe(null);
    expect(compiled.querySelector('app-rest')).not.toBe(null);
    expect(compiled.querySelector('app-lazy')).not.toBe(null);
  });

});

//ToDo: make spec file to work together with generic-table


describe('rest.component.ts', () => {
  let component: RestComponent;
  let fixture: ComponentFixture<RestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponentAnchorDirective,
        GenericTableComponent,
        GtPaginationComponent,
        GtVisiblePipe,
        GtRenderPipe,
        DashCasePipe,
        GtPropertyPipe,
        GtChunkPipe,
        GtFilterPipe,
        GtOrderByPipe,
        GtSearchPipe,
        PaginationPipe,
        GtTableInfoComponent,
        TableInfoPipe,
        GtExpandingRowComponent,
        RestComponent
      ],
      imports: [HttpModule],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
     fixture = TestBed.createComponent(RestComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component, 'applySearch').and.callThrough();
    spyOn(component, 'applyFilter').and.callThrough();
    component.applySearch('Anna');
    component.applyFilter();
  });

    it('Should check if it exist', () => {
      expect(component).toBeTruthy();
    });

    it('Tracks that the spy was called', () => {
      expect(component.applySearch).toHaveBeenCalled();
      expect(component.applySearch).toHaveBeenCalled();
    });

    it('Tracks all the argument of its calls', function() {
      expect(component.applySearch).toHaveBeenCalledWith('Anna');
      expect(component.applyFilter).toHaveBeenCalledWith();
    });
});

