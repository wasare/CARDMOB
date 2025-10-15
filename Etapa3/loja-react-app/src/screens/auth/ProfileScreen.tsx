import React, { useEffect, useState } from "react"; // modificado
import { View, Text, Button, StyleSheet, Image } from "react-native"; // modificado

import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

import { requestProfileById } from "../../services/profileService"; // novo 

function ProfileScreen({ navigation }: any) {
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const [user, setUser] = useState({}); // novo

    // novo
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await requestProfileById(1);
                console.log(user);
                setUser(user);
                console.log('Carregou o usuário!');
            }
            catch (error) {
                console.error('Erro ao carregar o perfil do usuário:', error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Profile Screen
            </Text>
            <View>
                <Image source={{ uri: user.image }} style={styles.image}/>
            </View>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.text}>{user.email}</Text>

            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={ () => navigation.navigate('Details')} />
            <Button title="Sair" onPress={logout}/>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: { // novo
        height: 100,
        width: 100,
    },
    text: { fontSize: 14} // novo
});