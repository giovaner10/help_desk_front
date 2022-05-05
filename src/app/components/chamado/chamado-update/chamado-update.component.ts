import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/model/chamados';
import { Cliente } from 'src/app/model/cliente';
import { Tecnico } from 'src/app/model/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service ';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.iniciar(this.chamado.id)
  }

  iniciar(id: any): void {
    this.chamadoService.findById(id).subscribe(resposta => {

      this.chamado = resposta


  })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }


  update(): void {
    this.chamadoService.update(this.chamado).subscribe(() => {
      this.toastService.success('Chamado atualizado com sucesso', 'Update');
      this.router.navigate(['chamados'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: { message: string | undefined; }) => {
          this.toastService.error(element.message);
        });
      } else {
        if(Number.parseInt(ex.error.status) == 403){
          this.toastService.error("Acesso a essa operação negado, sem permissão.");

        }else{
        this.toastService.error(ex.error.message);
        }
      }

    })
  }

}
