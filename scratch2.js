"use strict";
var rotulos = { pendente: 'P', concluido: 'C', pulado: 'Pu' };
Object.keys(rotulos).map(function (status) { return rotulos[status]; });
