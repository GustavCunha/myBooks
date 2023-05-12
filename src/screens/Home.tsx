import React, { useState } from 'react';
import { Center, FlatList, HStack, IconButton, Image, Text, VStack, useTheme, Heading } from "native-base";
import { Books, Plus, SignOut } from "phosphor-react-native";
import { useNavigation } from '@react-navigation/native';

import { Filter } from '../components/Filter';
import { Book, BookProps } from '../components/Book';

import Logo from '../assets/logo_horizontal.png';
import { library } from '../utils/books';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

export function Home() {
    const {colors} = useTheme();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [statusSelected, setStatusSelected] = useState<'reading' | 'finished'>('reading');
    const [books, setBooks] = useState<BookProps[]>([]);

    function goNewBook() {
        navigation.navigate('new')
    }

    function handleOpenDetails(book: BookProps) {
        navigation.navigate('details', {book});
    }

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
                    icon={<SignOut size={26} color={colors.gray[100]}/>}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Meus livros
                    </Heading>

                    <Text color="gray.200">
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
                        renderItem={({item}) => <Book data={item} onPress={() => handleOpenDetails(item)}/>}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 100}}
                        ListEmptyComponent={() => (
                            <Center>
                                <Books color={colors.gray[300]} size={40}/>
                                <Text color='gray.300' fontSize="xl" mt={6} textAlign="center">
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