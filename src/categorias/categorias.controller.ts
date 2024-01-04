import { Controller, Body, Post, Get, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interface/categoria.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(
      private readonly categoriasService: CategoriasService){}

   @Post()
   @UsePipes(ValidationPipe)   
   async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto):Promise<Categoria>{
   
     return await this.categoriasService.criarCategoria(criarCategoriaDto);
   }


   @Get()
   async consultarCategorias(): Promise<Array<Categoria>>{

     return await this.categoriasService.consultarTodasCategorias();
   }


   @Get('/:categoria')  //validacao de categoria ausente no param?????
   async consultarCategoriaPorId(@Param('categoria') categoria:String): Promise<Categoria>{

     return await this.categoriasService.consultarCategoriaPorId(categoria);
   }

   //refatorar envio de uma mnsg?????
   @Put('/:categoria')
    @UsePipes(ValidationPipe)
   async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto, @Param('categoria') categoria: String ):Promise<void>{
      
      await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
   }

   //refatorar retorno de uma mnsg?????
   @Post('/:categoria/jogadores/:idJogador')
   // O UsePipes apenas para @Body / dados passados validado internamente
   // falta validar url 404
   async atribuirJogadorCategoria(
       @Param() params: string[]
    ): Promise<void>{

    //console.log(params);
     await this.categoriasService.atribuirJogadorCategoria(params);
   }
   
}

