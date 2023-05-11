import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Heading, Icon, Image, VStack, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo.png';

export function SignIn() {
    const {colors} = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSignIn() {
        setIsLoading(true)
        navigation.navigate('home')
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