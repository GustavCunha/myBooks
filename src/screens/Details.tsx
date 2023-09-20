import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore'
import { BookOpen, CircleWavyCheck, IdentificationBadge, Notebook, PencilLine } from 'phosphor-react-native';

import { BookProps } from '../components/Book';
import { BookDetails } from '../components/BookDetails';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { BookFirestoreDTO } from '../dto/BookDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

type RouteParams = {
    bookId: string;
}

export function Details() {
    const route = useRoute();
    const navigation = useNavigation()
    const {colors} = useTheme();
    const {bookId} = route.params as RouteParams;  
    
    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState<BookProps>({} as BookProps)
    
    const statusColor = book.status === 'reading' ? colors.secondary[700] : colors.primary[500];

    function handleFinished() {
        firestore()
            .collection('books')
            .doc(bookId)
            .update({
                status: 'finished',
                finished_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert('Sucesso', 'Parabens pela leitura do livro.')
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Erro', 'Ocorreu um erro ao marcar como lido')
            })
    }

    useEffect(() => {
        firestore()
            .collection<BookFirestoreDTO>('books')
            .doc(bookId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const {title, description, status, created_at, finished_at} = doc.data();

                    const closed_at = finished_at ? dateFormat(finished_at) : null;

                    setBook({
                        id: doc.id,
                        title,
                        description,
                        status,
                        closed: closed_at,
                        when: dateFormat(created_at)
                    })
                }
                setIsLoading(false)
            });
    }, []);

    return (
        <VStack flex={1} bg='gray.700'>
            <Box px={4} bg="gray.600">
                <Header title='Livro' />
            </Box>

            <HStack p={4} bg='gray.500' w='full' justifyContent='center'>
                {book.status === 'finished' 
                    ? <CircleWavyCheck size={24} color={statusColor} />
                    : <BookOpen size={24} color={statusColor} />
                }
                <Text color={statusColor} ml={2} textTransform='uppercase' fontFamily='heading' fontSize='md'>
                    {book.status === 'reading' ? 'lendo' : 'lido'}
                </Text>
            </HStack>

            <ScrollView showsVerticalScrollIndicator={false}>
                <BookDetails 
                    title='Nome do Livro'
                    status={book.status} 
                    description={book.title}
                    icon={IdentificationBadge}
                />

                <BookDetails 
                    title='Resumo'
                    status={book.status} 
                    description={book.description}
                    icon={Notebook}
                />

                <BookDetails 
                    title='Avaliação'
                    status={book.status} 
                    description=""
                    icon={PencilLine}
                />

                {book.status === 'reading' && <Button title='Marcar como lido' mt={6} mx={4} onPress={handleFinished}/>}
            </ScrollView>
        </VStack>
    );
}