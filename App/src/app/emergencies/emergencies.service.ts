import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { Emergency } from './emergency.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EmergencyLocation } from './location.model';

interface EmergencyData {
  atrapados: string;
  descripcion: string;
  imageUrl: string;
  inconsientes: string;
  lesionados: string;
  numLesionados: number;
  puntoIncidente: string;
  titulo: string;
  userId: string;
  location: EmergencyLocation;
}

@Injectable({
  providedIn: 'root'
})

export class EmergenciesService {
  // tslint:disable-next-line: variable-name
  public _emergencies = new BehaviorSubject<Emergency[]>([]);
  /*[
  new Emergency(
    'p1',
    'Un ciclista fue atropellado',
    'si',
    'si',
    1,
    'no',
    'no',
    'Un carro se paso el semaforo en rojo y atropello un ciclista.',
    'https://cadenaser00.epimg.net/ser/imagenes/2019/04/02/radio_bilbao/1554217034_181079_1554217429_noticia_normal.jpg',
    'abc'
  ),
  new Emergency(
    'p2',
    'Bicicleta Robada',
    'no',
    'si',
    0,
    'no',
    'no',
    'Dos hombres armados arremetieron contra mi, me hicieron bajar de la bicicleta y me la robaron.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7JuSN3UXgq1AQ1Y2zBcSUMWiOkpsY0S2dWMWkB2-wRDG7n2kt',
    'def'
  ),
  new Emergency(
    'p3',
    'Bicicleta Averiada',
    'no',
    'no',
    0,
    'no',
    'no',
    'Iba pedaleando mi bicicleta en una subida incliada y se me rompio la cadena.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4rPXjRNqQ5-F-wOUQLADW7zPr02pXuwWJbI-8fcYB9kKvXBsX',
    'ghi'
  )
]);*/

  constructor(private authService: AuthService, private http: HttpClient) { }

  get emergencies() {
    return this._emergencies.asObservable();
  }

  getEmergency(id: string) {
    return this.http
      .get<EmergencyData>(
        `https://bd-sosciclistas.firebaseio.com/lista-emergencias/${id}.json`
      )
      .pipe(
        map(emergencyData => {
          return new Emergency(
            id,
            emergencyData.titulo,
            emergencyData.lesionados,
            emergencyData.puntoIncidente,
            emergencyData.numLesionados,
            emergencyData.atrapados,
            emergencyData.inconsientes,
            emergencyData.descripcion,
            emergencyData.imageUrl,
            emergencyData.userId,
            emergencyData.location
          );
  })
      );
}

addEmergency(titulo: string,
             lesionados: string,
             puntoIncidente: string,
             numLesionados: number,
             atrapados: string,
             inconsientes: string,
             descripcion: string,
             location: EmergencyLocation
) {
  let firebaseId: string;
  const newEmergency = new Emergency(
    Math.random().toString(),
    titulo,
    lesionados,
    puntoIncidente,
    numLesionados,
    atrapados,
    inconsientes,
    descripcion,
    'https://www.rdiserviciosjuridicos.com/wp-content/uploads/2018/12/atropello-2_opt.jpg',
    this.authService.userId,
    location
  );
  return this.http
    .post<{ name: string }>('https://bd-sosciclistas.firebaseio.com/lista-emergencias.json',
      { ...newEmergency, id: null })
    .pipe(
      switchMap(resData => {
        firebaseId = resData.name;
        return this.emergencies;
      }),
      take(1),
      tap(emergencies => {
        newEmergency.id = firebaseId;
        this._emergencies.next(emergencies.concat(newEmergency));
      })
    );
}

editEmergency(emergencyId: string, titulo: string, descripcion: string) {
  let updatedEmergencies: Emergency[];
  return this.emergencies.pipe(
    take(1),
    switchMap(emergencies => {
      if (!emergencies || emergencies.length <= 0) {
        return this.fetchEmergencies();
      } else {
        return of(emergencies);
      }
    }),
    switchMap(emergencies => {
      const updatedEmergencyIndex = emergencies.findIndex(em => em.id === emergencyId);
      updatedEmergencies = [...emergencies];
      const oldEmergency = updatedEmergencies[updatedEmergencyIndex];
      updatedEmergencies[updatedEmergencyIndex] = new Emergency(
        oldEmergency.id,
        titulo,
        oldEmergency.lesionados,
        oldEmergency.puntoIncidente,
        oldEmergency.numLesionados,
        oldEmergency.atrapados,
        oldEmergency.inconsientes,
        descripcion,
        oldEmergency.imageUrl,
        oldEmergency.userId,
        oldEmergency.location
      );
      return this.http.put(
        `https://bd-sosciclistas.firebaseio.com/lista-emergencias/${emergencyId}.json`,
        { ...updatedEmergencies[updatedEmergencyIndex], id: null }
      );
    }),
    tap(() => {
      this._emergencies.next(updatedEmergencies);
    })
  );
}

deleteEmergency(emergencyId: string) {
  return this.http
      .delete(
        `https://bd-sosciclistas.firebaseio.com/lista-emergencias/${emergencyId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.emergencies;
        }),
        take(1),
        tap(emergencies => {
          this._emergencies.next(emergencies.filter(b => b.id !== emergencyId));
        })
      );
}

fetchEmergencies() {
  return this.http
    .get<{ [key: string]: EmergencyData }>('https://bd-sosciclistas.firebaseio.com/lista-emergencias.json')
    .pipe(map(resData => {
      const emergencies = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          emergencies.push(new Emergency(
            key,
            resData[key].titulo,
            resData[key].lesionados,
            resData[key].puntoIncidente,
            resData[key].numLesionados,
            resData[key].atrapados,
            resData[key].inconsientes,
            resData[key].descripcion,
            resData[key].imageUrl,
            resData[key].userId,
            resData[key].location
          ));
        }
      }
      return emergencies;
    }),
      tap(emergencies => {
        this._emergencies.next(emergencies);
      }));
}
}
