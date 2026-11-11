import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        App
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('nav a');

    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Géneros');
    expect(links[1].textContent).toContain('Bandas');
  });
});
