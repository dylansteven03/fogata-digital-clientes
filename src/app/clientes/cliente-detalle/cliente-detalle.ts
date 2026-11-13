import { Component, inject, input, signal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ClienteService } from '../services/cliente';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-cliente-detalle',
  imports: [RouterLink, DatePipe],
  templateUrl: './cliente-detalle.html',
  styleUrl: './cliente-detalle.css'
})
export class ClienteDetalleComponent {

  private clienteService = inject(ClienteService);
  private router = inject(Router);

  id = input.required<string>();
  cliente = signal<Cliente>(new Cliente());

  constructor() {
    effect(() => {
      this.clienteService.getCliente(+this.id()).subscribe((cliente: any) => {
        this.cliente.set(cliente);
      });
    });
  }

  deleteCliente(): void {
    Swal.fire({
      title: '¿Eliminar cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(this.cliente().id!).subscribe(() => {
          this.router.navigate(['/clientes']);
          Swal.fire('Eliminado', 'El cliente fue eliminado.', 'success');
        });
      }
    });
  }
}
