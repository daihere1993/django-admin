import { NgModule } from '@angular/core';
import AjaxService from './ajax.service';
import EntityService from './entity.service';

@NgModule({
  providers: [AjaxService, EntityService],
})
export default class ServicesModule {}
