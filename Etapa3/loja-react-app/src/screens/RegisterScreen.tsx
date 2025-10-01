import React, { useState } from "react";
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput} from "react-native";

import { requestLogin } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleRegister = async () => {
        try {
            // Lógica de login / conexão com backend.
            if (password === confirmPassword) {
                const token = await requestLogin(email, password);
                login(token);
                console.log('Login ok');
                navigation.navigate('Login');
            }
            setError('As senhas devem ser idênticas.');
        } catch (err: any) {
            setError(err);
        }
    }
    return ( 
        <SafeAreaView style={styles.container}>
        <View>
            <Text>Email:</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <Text>Senha:</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text>Confirmar senha:</Text>
            <TextInput 
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            { error ? 
                <Text 
                    style={{ color: 'red'}}
                >
                {error}
                </Text> :
                null
            }
            <Button title="Cadastrar" onPress={handleRegister} />
            <Button title="Já tenho conta" onPress={ () => navigation.navigate('Login') } />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
    }
});