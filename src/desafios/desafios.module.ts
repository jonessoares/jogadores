import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interface/desafio.schema';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidasModule } from 'src/partidas/partidas.module';

@Module({
   imports: [MongooseModule.forFeature([{name: 'Desafio', schema: DesafioSchema}]),
   JogadoresModule, CategoriasModule, PartidasModule],
   controllers: [DesafiosController],
   providers: [DesafiosService],
   exports:[DesafiosService]
})

export class DesafiosModule {}

