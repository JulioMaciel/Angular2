import { Component } from '@angular/core'
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})

export class ListagemComponent
{
    fotos: FotoComponent[] = []; // Array<Object> é o tipo
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService) ///*@Inject(Http)*/
    {
        this.service = service;

        this.service.lista()
                    .subscribe(fotos => 
                    {
                        this.fotos = fotos;
                    }), erro => console.log(erro);
    }

    remove(foto)
    {
        //if (confirm('Confirma exclusão da foto?'))
        this.service
            .remove(foto)
            .subscribe(
                () => {
                    let novasFotos = this.fotos.slice(0); // copia lista pra nova referência
                    let indice = novasFotos.indexOf(foto);
                    novasFotos.splice(indice, 1); //remove a do indice 1
                    this.fotos = novasFotos;
                    this.mensagem = 'Foto removida com sucesso';
                },
                erro => {
                    console.log(erro);
                    this.mensagem = 'Não foi possível remover a foto';
                }
            );
    }
}