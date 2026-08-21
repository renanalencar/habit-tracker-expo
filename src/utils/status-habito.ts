import type { StatusHabito } from '../types/habito';

/**
 * Ex. 5 — switch exaustivo.
 *
 * O `default` com `never` é o que faz o exercício funcionar: se um novo valor
 * (ex.: 'atrasado') for adicionado a `StatusHabito`, este arquivo passa a dar
 * erro de compilação — o bug aparece no build, não em produção.
 */
export function corDoStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':
      return '#fb8c00';
    case 'concluido':
      return '#43a047';
    case 'pulado':
      return '#9e9e9e';
    default: {
      const naoTratado: never = status;
      throw new Error(`StatusHabito não tratado: ${naoTratado}`);
    }
  }
}

export function rotuloDoStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':
      return 'Pendente';
    case 'concluido':
      return 'Concluído';
    case 'pulado':
      return 'Pulado';
    default: {
      const naoTratado: never = status;
      throw new Error(`StatusHabito não tratado: ${naoTratado}`);
    }
  }
}
