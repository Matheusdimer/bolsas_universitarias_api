import {ValueTransformer} from "typeorm";

export  enum Sexo {
    MASCULINO = "M",
    FEMININO = "F",
    OUTROS = "O"
}

export const SexoTransformer: ValueTransformer = {
    to(value: any): any {
        let result = null;
        for(const tipo in Sexo){
            if(tipo.includes(value)){
                result = tipo;
            }
        }
        return result;
    },
    from(value: any): any {
        return value.slice(0,1);
    }
}
