export type StatusHabito = 'pendente' | 'concluido' | 'pulado';

export type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

export type FrequenciaHabito = 'diaria' | 'semanal';

export interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}

export type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>;

export type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>;

export type AtualizacaoHabito = Partial<Omit<Habito, 'id' | 'criadoEm'>>;

export type EstadoTela<T> =
  | { situacao: 'carregando' }
  | { situacao: 'sucesso'; dados: T }
  | { situacao: 'erro'; mensagem: string };
