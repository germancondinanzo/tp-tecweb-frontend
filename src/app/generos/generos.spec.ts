import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Generos } from './generos';

describe('Generos', () => {
  let component: Generos;
  let fixture: ComponentFixture<Generos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Generos],
      imports: [CommonModule, FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Generos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty list', () => {
    expect(component.generos).toEqual([]);
  });
});
