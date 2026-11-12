import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Bandas } from './bandas';

describe('Bandas', () => {
  let component: Bandas;
  let fixture: ComponentFixture<Bandas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bandas],
      imports: [CommonModule, FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bandas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with no bands', () => {
    expect(component.bandas).toEqual([]);
  });
});