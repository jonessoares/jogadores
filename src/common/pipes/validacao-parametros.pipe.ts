import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform{
  // um valor deve ser passado no handle quer por param ou query param
  transform(value: any, metadata: ArgumentMetadata){

        //console.log( `value: ${value}, argument: ${metadata.type}`)
        //se ausente lança erro
    if(!value){
      throw new BadRequestException(`O valor do parametro ${metadata.type} deve ser informado!`)
    }

      return value;
  }


}