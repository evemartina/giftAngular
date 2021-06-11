import { Component, ViewChild, ElementRef} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  
})
export class BusquedaComponent {

  @ViewChild('txtBuscar')txtBuscar!:ElementRef<HTMLInputElement>;

  constructor (private gifservice:GifsService ){

  }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){   
      return
    }
    this.gifservice.buscarGift(valor)
    this.txtBuscar.nativeElement.value ='';
  }
}
