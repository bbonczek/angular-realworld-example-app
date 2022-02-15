import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EditorComponent } from './editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CatFactsService } from '../core/services/cat-facts.service';
import { of, throwError } from 'rxjs';

let component: EditorComponent;
let fixture: ComponentFixture<EditorComponent>;
let mockCatFactService: CatFactsService;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
    declarations: [ EditorComponent ],
  });

  fixture = TestBed.createComponent(EditorComponent);
  component = fixture.componentInstance; // BannerComponent test instance
});

describe('Editor', () => {
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getInspred', () => {
        it('should populate forms body with random cat fact', fakeAsync(() => {
            const fakeCatFact = 'Cats can be sometimes as big as skyscrapers!';

            mockCatFactService = TestBed.inject(CatFactsService);
            spyOn(mockCatFactService, 'getRandom').and.returnValue(of({ text: fakeCatFact }));

            component.getInspired();
            tick();
            expect(component.articleForm.get('body').value).toEqual(fakeCatFact);
        }));

        it('should raise error flag if cat facts api returns an error', fakeAsync(() => {
            mockCatFactService = TestBed.inject(CatFactsService);
            spyOn(mockCatFactService, 'getRandom').and.returnValue(throwError('Problem with external api'));

            component.getInspired();
            tick();
            expect(component.getInspiredError).toBeTrue();
        }));
    });
});
