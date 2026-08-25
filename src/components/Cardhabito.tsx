import { Text, StyleSheet } from "react-native";

// ESCREVA O TIPO AQUI
type CardHabitoProps = /* ... */;

export function CardHabito({
    titulo,
    categoria,
    status,
    onPress,
    destacado = false,
}: CardHabitoProps) {
    return (
        <Text
            onPress={onPress}
            style={[styles.card, destacado && styles.destaque]}
        >
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.meta}>{categoria} · {status}</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    destaque: {
        borderColor: '#007bff',
        borderLeftWidth: 4,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    meta: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});
