import { Module } from '@nestjs/common';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './interface/partida.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Partida', schema: PartidaSchema}])],
  controllers: [PartidasController],
  providers: [PartidasService],
  exports: [PartidasService]
})

export class PartidasModule {}
