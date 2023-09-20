import React, { useEffect, useState } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Center, FlatList, HStack, IconButton, Image, Text, VStack, useTheme, Heading } from 'native-base';
import { Books, SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { Book, BookProps } from '../components/Book';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Loading } from '../components/Loading';

import Logo from '../assets/logo_horizontal.png';
import { library } from '../utils/books';
import { dateFormat } from '../utils/firestoreDateFormat';

export function Home() {
    const {colors} = useTheme();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [statusSelected, setStatusSelected] = useState<'reading' | 'finished'>('reading');
    const [books, setBooks] = useState<BookProps[]>(library);

    function goNewBook() {
        navigation.navigate('new')
    }

    function handleOpenDetails(bookId: String) {
        navigation.navigate('details', {bookId});
    }

    function handleLogout() {
        auth().signOut().catch((error) => {
            console.log('Erro ao sair', error)
            return Alert.alert('Erro', 'Não foi possível sair.')
        });
    }

    useEffect(() => {
        setIsLoading(true)
        const subscriber = firestore()
            .collection('books')
            .where('status', '==', statusSelected)
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const {title, description, status, created_at} = doc.data();

                    return {
                        id: doc.id,
                        title,
                        description,
                        status,
                        when: dateFormat(created_at)
                    }
                })

                setBooks(data)
                setIsLoading(false)
            });

        return subscriber
            
    }, [statusSelected])

    return (
        <VStack flex={1} bg='gray.700' pb={6}>
            <HStack 
                w='full'
                h='32'
                justifyContent='space-between'
                alignItems='center'
                bg='gray.600'
                pt={12}
                pb={4}
                px={6}
            >
                <Image source={Logo} resizeMode='contain' size='xl' alt='Logo'/>

                <IconButton 
                    icon={<SignOut size={26} color={colors.gray[100]} />}
                    onPress={handleLogout}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>
                        Meus livros
                    </Heading>

                    <Text color='gray.200'>
                        {books.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                        title='lendo' 
                        type='reading'
                        onPress={() => setStatusSelected('reading')}
                        isActive={statusSelected === 'reading'}
                    />
                    <Filter 
                        title='lido' 
                        type='finished'
                        onPress={() => setStatusSelected('finished')}
                        isActive={statusSelected === 'finished'}
                    />
                </HStack>

                {isLoading ? (
                    <Loading />
                    ) : (
                    <FlatList 
                        data={books}
                        keyExtractor={item => String(item.id)}
                        renderItem={({item}) => <Book data={item} onPress={() => handleOpenDetails(item.id)}/>}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 100}}
                        ListEmptyComponent={() => (
                            <Center>
                                <Books color={colors.gray[300]} size={40}/>
                                <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                                    {statusSelected === 'reading' ? 
                                        `Você não começou \na ler nenhum livro` : 
                                        `Você não terminou \n de ler nenhum livro`
                                    }
                                </Text>
                            </Center>
                        )}
                    />
                )}

                <Button title='Novo livro' onPress={goNewBook}/>
            </VStack>
        </VStack>
    )
}