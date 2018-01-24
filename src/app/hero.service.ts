import { Injectable } from '@angular/core';
import { Hero } from './hero';
// mock antigo, pode deletar
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(  
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  // esse metodo é síncrono
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // aqui é assincrono
  // getHeroes(): Observable<Hero[]> {
  // Todo: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }



}

