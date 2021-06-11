import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string="jvURyfiBZaViltOWpsBlWGnBpeZwvnGG";
  private servicioUrl="https://api.giphy.com/v1/gifs"
  private _historial:string[]=[];
  public resultados :Gif[]=[];

  get historial(){
    return [...this._historial]
  }
  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('Historial')!)||[];
    this.resultados = JSON.parse(localStorage.getItem('respuesta')!)||[];
  }

  buscarGift(query:string){    
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
        this._historial.unshift(query)
        this._historial = this._historial.splice(0,10);
        localStorage.setItem('Historial',JSON.stringify(this._historial))
        console.log(this._historial)
    }
     const params = new HttpParams()
        .set('api_key',this.apiKey)
        .set('limit','10')
        .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe( (resp:any)=>{
      this.resultados = resp.data;
      localStorage.setItem('respuesta',JSON.stringify(resp.data))
    })
    
  }

}
