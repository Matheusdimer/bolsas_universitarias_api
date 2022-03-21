import {SimNao, Situacao} from "../model/viagem.model";
import {ValueTransformer} from "typeorm";

export const SimNaoTransformer: ValueTransformer = {
    to(value: any): any {
        return value === "SIM" ? SimNao.SIM : SimNao.NAO;
    },
    from(value: any): any {
        return value === SimNao.SIM ? "SIM" : "NAO";
    }
}

export const SituacaoTransformer: ValueTransformer = {
    to(value: any): any {
        return value === "REALIZADA" ? Situacao.REALIZADA : Situacao.NAO_REALIZADA;
    },
    from(value: any): any {
        return value === Situacao.REALIZADA ? "REALIZADA" : "NAO_REALIZADA";
    }
}

