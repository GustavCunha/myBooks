import { VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function New() {
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function handleNewBook() {
        if(!title || !description) {
            return Alert.alert('Cadastro', 'Preencha todos os campos.')
        }
    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title='Novo livro'/>

            <Input 
                placeholder='Título do livro'
                mt={4}
                onChangeText={setTitle}
            />
            
            <Input 
                placeholder='Resumo'
                mt={5}
                flex={1}
                multiline
                textAlignVertical='top'
                onChangeText={setDescription}
            />

            <Button 
                title='Cadastrar'
                mt={5}
                isLoading={isLoading}
                onPress={handleNewBook}
            />
        </VStack>
    );
}