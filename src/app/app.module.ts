import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LazyComponent } from './lazy/lazy.component';
import { RestComponent } from './rest/rest.component';
import { GenericTableModule } from '../generic-table/generic-table.module';
import { CustomRowComponent } from './custom-row/custom-row.component';
import { StaticComponent } from './static/static.component';
import { ExamplesComponent } from './examples/examples.component';
import { AppRoutingModule } from './app-routing.module';
import { MyTestComponent } from './my-test/my-test.component';
import { MyPipePipe } from './my-pipe.pipe';
import { TestPipePipe } from './test-pipe.pipe';
import { TestSearchComponent } from './test-search/test-search.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LazyComponent,
    RestComponent,
    CustomRowComponent,
    StaticComponent,
    ExamplesComponent,
    MyTestComponent,
    MyPipePipe,
    TestPipePipe,
    TestSearchComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GenericTableModule,
    AppRoutingModule
  ],
  entryComponents: [ CustomRowComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
