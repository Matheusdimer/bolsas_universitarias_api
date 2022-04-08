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
            if(tipo.slice(0,1) == (value)){
                result = tipo;
            }
        }
        return result;
    },
    from(value: any): any {
        let result = value.slice(0,3);
        if(eVogal(result.charAt(3))){
            return result.slice(0,2);
        }
        return result;
    }
}
function eVogal(c: any) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}
