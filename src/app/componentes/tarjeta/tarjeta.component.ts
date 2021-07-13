import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {

  accion = 'Agregar';

  id : number | undefined

  //Agregando la mascara
  public numerotarjetaMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public fechaMask = [/\d/, /\d/, '/', /\d/, /\d/,]


  //Para agrupar los elementos del formulario
  form: FormGroup;
  listadoTarjetas: any[] = [];


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaServices: TarjetaService) {

    //Validando los campos
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(19), Validators.minLength(19)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas()
  }

  guardarTarjeta() {

    const tarjetaUser: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }

    if(this.id == undefined){
      //Se agrega una nueva tarjeta
      this._tarjetaServices.saveTarjetas(tarjetaUser).subscribe(data => {
        this.toastr.success('La tarjeta ha sido registrada con exito!', 'Tarjeta');
        this.obtenerTarjetas()
        this.form.reset()
      }, error => {
        console.log(error)
        this.toastr.error('Ocurrió un error... intente más tarde', 'f')
      }
      );
    }
    else{
      tarjetaUser.id = this.id;
      this._tarjetaServices.editTarjetas(this.id,tarjetaUser).subscribe(data =>{
        this.form.reset()
        this.accion = "Agregar"
        this.id = undefined
        this.toastr.info('La tarjeta ha sido editada con exito!', 'Tarjeta Actualizada' );
        this.obtenerTarjetas()
      }, error => {
        console.log(error)
        this.toastr.error('Ocurrió un error... intente más tarde ', 'f')
      }
      );
    }
  }

  eliminarTarjeta(id: number) {
    this._tarjetaServices.deleteTarjetas(id).subscribe(data => {
      this.toastr.error('La tarjeta ha sido eliminada con exito', 'f')
      this.form.reset()
      this.obtenerTarjetas()
    }, error => {
      console.log(error)
    }
    );

  }

  obtenerTarjetas() {
    this._tarjetaServices.getTarjetas().subscribe(data => {
      console.log(data);
      this.listadoTarjetas = (data)
    }, error => {
      console.log(error)
    }
    )
  }

  editarTarjeta(tarjeta: any){
    this.accion = "editar";
    this.id = tarjeta.id;

    this.form.patchValue({
      titular : tarjeta.titular,
      numeroTarjeta : tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      cvv : tarjeta.cvv
    })
  }

}
