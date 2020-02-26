import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPet } from '../interfaces/pet.interface';
import { DexieService } from './dexie.service';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class DataFacadeService {

  constructor(private httpClient: HttpClient, private dexie: DexieService) {
    window.addEventListener('online', (event) => this.isOnline = event.type === 'online');
    window.addEventListener('offline', (event) => this.isOnline = event.type === 'online');
  }

  isOnline = true;
  getAllPetDrafts() {
    throw new Error('Method not implemented.');
  }

  getPetList(queryParam: string): Observable<IPet[]> {
    const url = 'https://petstore.swagger.io/v2/pet/findByStatus?' + queryParam;
    return this.httpClient.get<IPet[]>(url);
  }

  getPetCategoryList(): Observable<any> {
    const url = './assets/categories.json';
    if (this.isOnline) {
      return this.httpClient.get(url).pipe(tap((data: any) => {
        this.dexie.categories.clear().then(() => {
          this.dexie.categories.bulkAdd(data.categories).catch((e) => console.log(e));
        });
      }));
    } else {
      return from(this.dexie.categories.toArray());
    }
  }

  getPetStatusList(): Observable<any> {
    const url = './assets/statuses.json';
    if (this.isOnline) {
      return this.httpClient.get(url).pipe(tap((data: any) => {
        this.dexie.statuses.clear().then(() => {
          this.dexie.statuses.bulkAdd(data.statuses).catch((e) => console.log(e));
        });
      }));
    } else {
      return from(this.dexie.statuses.toArray());
    }
  }

  createPet(pet: IPet) {
    if (this.isOnline) {
      const url = 'https://petstore.swagger.io/v2/pet/';
      return this.httpClient.post<any>(url, pet);
    } else {
      return from(this.dexie.pets.add(pet));
    }
  }
}
