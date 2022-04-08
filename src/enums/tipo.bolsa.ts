import {ValueTransformer} from "typeorm";

export  enum TipoBolsa {
    MUNICIPAL = "MUN",
    ESTADUAL = "EST",
    FEDERAL = "FED",
    INSTITUCIONAL = "INST",
    CONVENIO = "CONV"
}

export const TipoBolsaTransformer: ValueTransformer = {
    to(value: any): any {
        let result = null;
        for(const tipo in TipoBolsa){
            if(tipo.charAt(0) == (value)){
                result = tipo;
            }
        }
        return result;
    },
    from(value: any): any {
        return value.charAt(0);
    }
}
function eVogal(c: any) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}
