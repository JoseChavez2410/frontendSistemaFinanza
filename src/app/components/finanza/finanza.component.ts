import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ViewChild } from '@angular/core'
import { GastoService } from 'src/app/services/gasto.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-finanza',
  templateUrl: './finanza.component.html',
  styleUrls: ['./finanza.component.scss']
})
export class FinanzaComponent implements OnInit {
  @ViewChild('closeModalPresupuesto')closebutton:any;
  @ViewChild('closeModalGasto')closebuttonGasto:any;
  presupuestoForm:FormGroup;
  newGastoForm:FormGroup;
  presupuesto:any={};
  presupuestoRestante:any;
  gastos:any=[];

  constructor(private formBuilder:FormBuilder,
    private presupuestoService:PresupuestoService,
    private gastoService:GastoService) 
    {
      this.presupuestoForm=this.formBuilder.group({
        monto:[null,{
          validators:[Validators.required]
        }]
      });
      this.newGastoForm=this.formBuilder.group({
        categoria:[null,{
          validators:[Validators.required]
        }],
        descripcion:[null,{
          validators:[Validators.required]
        }],
        monto:[null,{
          validators:[Validators.required]
        }],
        fecha:[null,{
          validators:[Validators.required]
        }]
      });
    }

  ngOnInit(): void {
    this.ObtenerPresupuesto();
  }

  ObtenerPresupuesto(){
    this.presupuestoService.obtenerPresupuesto().subscribe((res)=>{
      this.presupuesto=(res as any).presupuesto;
      this.ObtenerGastos();
    })
  }

  GuardarPresupuesto(){
    const body = {
      monto:this.presupuestoForm.get('monto')?.value
    };
    this.presupuestoService.modificarPresupuesto(body,this.presupuesto._id).subscribe((res)=>{
      this.presupuestoForm.reset();
      this.closebutton.nativeElement.click();
      this.ObtenerPresupuesto();
    }); 
  }

  GuardarGasto(){
    const body = {
      categoria:this.newGastoForm.get('categoria')?.value,
      descripcion:this.newGastoForm.get('descripcion')?.value,
      monto:this.newGastoForm.get('monto')?.value,
      fecha:this.newGastoForm.get('fecha')?.value
    };
    this.gastoService.guardarGasto(body).subscribe((res)=>{
      this.newGastoForm.reset();
      this.closebuttonGasto.nativeElement.click();
      this.ObtenerGastos();
    }); 
  }

  ObtenerGastos(){
    this.gastoService.obtenerGastoUsuario().subscribe((res)=>{
      this.gastos=(res as any).gastos;
      this.CalculoPresupuesto();
    })
  }
  EliminarGasto(id:any){
    this.gastoService.eliminarGasto(id).subscribe((res)=>{
      this.ObtenerGastos();
    })
  }

  CalculoPresupuesto(){
    let total:any=0;
    Object.keys(this.gastos).forEach(key => {
      total=total+this.gastos[key].monto;
    });
    this.presupuestoRestante= this.presupuesto.monto-total;
  }

}
