type StatusHabito = 'pendente' | 'concluido' | 'pulado';
const rotulos: Record<StatusHabito, string> = { pendente: 'P', concluido: 'C', pulado: 'Pu' };
Object.keys(rotulos).map(status => rotulos[status]);
