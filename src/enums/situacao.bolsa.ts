import {ValueTransformer} from "typeorm";

export  enum SituacaoBolsa {
    AGUARDANDO_ANALISE,
    EM_ANALISE,
    APROVADO,
    REJEITADO,
    AGUARDANDO_CORRECAO
}

// export const SexoTransformer: ValueTransformer = {
//     to(value: any): any {
//         let result = null;
//         for(const tipo in Sexo){
//             if(tipo.includes(value)){
//                 result = tipo;
//             }
//         }
//         return result;
//     },
//     from(value: any): any {
//         return value.slice(0,1);
//     }
// }
