import { View, ScrollView, Text, StyleSheet } from 'react-native';
// TODO(Aula 2 — Ex. 3): este componente tem erros propositais de View/Text/StyleSheet
// para você corrigir — ver exercises.md da Aula 2.
export default function Cabecalho() {
    return (
        <ScrollView style={styles.container}>
            <Text>Hábitos de hoje</Text>
            <View>
                <Text style={styles.linha}>Total: 5</Text>
                <Text style={styles.linha}>Concluídos: 2</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    linha: { justifyContent: 'space-between' },
});