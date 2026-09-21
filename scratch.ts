type StatusHabito = 'pendente' | 'concluido' | 'pulado';
const rotulos: Record<StatusHabito, string> = { pendente: 'P', concluido: 'C', pulado: 'Pu' };
const ordem: StatusHabito[] = ['pendente', 'concluido', 'pulado'];
ordem.map(status => rotulos[status]);
