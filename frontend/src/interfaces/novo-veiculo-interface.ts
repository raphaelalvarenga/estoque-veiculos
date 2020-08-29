export default interface NovoVeiculo {
    idVeiculo?: number;
    idMarca: number | string;
    idModelo: number | string;
    ano: number;
    descricao: string;
    vendido: number; // Deveria ser boolean, mas o MySQL trabalha com 1 (para TRUE) e 0 (para FALSE)
    created?: string;
    updated?: string;
}