// app/grade-lab.tsx — arquivo descartável, apague depois
import { View, StyleSheet } from 'react-native';

const CELULAS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GradeLab() {
    return (
        <View style={styles.grade}>
            {CELULAS.map((n) => (
                <View key={n} style={styles.celula} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grade: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        // TODO 1: a propriedade que espaça irmãos entra AQUI. Qual é?
        // `gap` espaça irmãos sem margin em cada filho.
        gap: 10,
    },
    celula: {
        // TODO 2: com `gap` no pai, três células de '30%' ainda cabem na linha?
        //         Faça a conta antes de mexer. Se não couberem, há duas saídas —
        //         uma ajusta a largura, a outra deixa o flex calcular. Prefira a segunda.
        // Com gap de 10 no pai, 3 x 30% + 2 x 10px estoura a linha. Em vez de baixar a
        // largura na mão, `flexBasis` + `flexGrow` deixam o flex fazer a conta.
        flexBasis: '30%',
        flexGrow: 1,
        height: 100,
        backgroundColor: '#F3E9DC',
        // TODO 3: remova o margin. Ele é a causa do espaçamento irregular.
        // Sem `margin` aqui: o espaçamento é todo do `gap` do pai.
    },
});