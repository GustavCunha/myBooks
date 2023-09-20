import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Heading, Icon, Image, VStack, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo.png';
import { Alert } from 'react-native';

export function SignIn() {
    const {colors} = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSignIn() {
        if (!email || !password) {
            console.log('Preencha todos os campos')
            return Alert.alert('Erro', 'Preencha todos os campos!')
        }

        setIsLoading(true)

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error)
                setIsLoading(false)

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('Erro', 'E-mail inválido!')
                }
                if (error.code === 'auth/wrong-password') {
                    return Alert.alert('Erro', 'E-mail ou senha inválida!')
                }
                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Erro', 'E-mail ou senha inválida!')
                }
                
                return Alert.alert('Erro', 'Ocorreu um erro ao fazer login')
                
            });
        
        // navigation.navigate('home')
    }
    
    return (
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Image source={Logo} resizeMode='contain' size='2xl' alt='Logo'/>

            <Heading color='gray.100' fontSize='xl' mt={14} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                mb={4}
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                value={email}
                onChangeText={setEmail}
            />

            <Input 
                mb={8}
                placeholder='Senha'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button 
                title='Entrar' 
                w='full' 
                isLoading={isLoading}
                onPress={handleSignIn}
            />
        </VStack>
    )
}