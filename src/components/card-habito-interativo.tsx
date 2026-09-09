// components/card-habito-interativo.tsx
import { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';

export default function CardHabito() {
    const [concluido, setConcluido] = useState(false);
    const [lembrete, setLembrete] = useState(false);

    // TODO 1: inverta o estado. Use a forma de função — o novo valor deriva do anterior.
    const alternar = () => { /* ... */ };

    return (
        // TODO 2: array de estilos — o base SEMPRE, o `cardConcluido` só quando concluído.
        //         Cuidado: com ternário você TROCA o estilo; com array você SOMA.
        <View style={/* ... */}>
            <Text
                // TODO 3: mesma ideia — styles.titulo + styles.tituloConcluido condicional
                style={/* ... */}
                // TODO 4: o que dispara a alternância no toque?
                onPress={/* ... */}
            >
                Beber 2L de água
            </Text>

            <View style={styles.linha}>
                <Text style={styles.rotulo}>Lembrete diário</Text>
                {/* TODO 5: ligue o Switch ao estado `lembrete`.
            Lembre: sem `value`, ele volta sozinho ao valor anterior. */}
                <Switch value={/* ... */} onValueChange={/* ... */} />
            </View>

            {/* TODO 6: 'Desmarcar' quando concluído, 'Marcar concluído' quando pendente */}
            <Button title={/* ... */} onPress={alternar} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        gap: 8,
    },
    cardConcluido: { backgroundColor: '#f2f8f2' },
    titulo: { fontSize: 18, fontWeight: '600' },
    tituloConcluido: { textDecorationLine: 'line-through', color: '#6b6459' },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rotulo: { fontSize: 14 },
});