import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AirportTestModule } from '../../../test.module';
import { AirplaneUpdateComponent } from 'app/entities/airplane/airplane-update.component';
import { AirplaneService } from 'app/entities/airplane/airplane.service';
import { Airplane } from 'app/shared/model/airplane.model';

describe('Component Tests', () => {
  describe('Airplane Management Update Component', () => {
    let comp: AirplaneUpdateComponent;
    let fixture: ComponentFixture<AirplaneUpdateComponent>;
    let service: AirplaneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AirportTestModule],
        declarations: [AirplaneUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AirplaneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AirplaneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AirplaneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Airplane(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Airplane();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
