import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from './interface/partida.interface';

@Injectable()
export class PartidasService {
  constructor(@InjectModel('Partida') private readonly partidaModel: Model<Partida>){}
}
