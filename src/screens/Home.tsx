import React, { useState } from 'react';
import { Center, FlatList, HStack, IconButton, Image, Text, VStack, useTheme } from "native-base";
import { Books, SignOut } from "phosphor-react-native";

import { Filter } from '../components/Filter';
import { Book, BookProps } from '../components/Book';

import Logo from '../assets/logo_horizontal.png';
import { library } from '../utils/books';

export function Home() {
    const {colors} = useTheme();

    const [statusSelected, setStatusSelected] = useState<'reading' | 'finished'>('reading');
    const [books, setBooks] = useState<BookProps[]>(library);

    return (
        <VStack flex={1} bg='gray.600' px={6}>
            <HStack 
                w='full'
                h='24'
                justifyContent='space-between'
                alignItems='center'
                bg='gray.600'
                pt={16}
                pb={4}
            >
                <Image source={Logo} resizeMode='contain' size='xl' alt='Logo'/>

                <IconButton 
                    icon={<SignOut size={26}  color={colors.gray[300]}/>}
                />
            </HStack>

            <HStack space={3} my={6}>
                <Filter 
                    title='lendo' 
                    type='reading'
                    onPress={() => setStatusSelected('reading')}
                    isActive={statusSelected === 'reading'}
                />
                <Filter 
                    title='já li' 
                    type='finished'
                    onPress={() => setStatusSelected('finished')}
                    isActive={statusSelected === 'finished'}
                />
            </HStack>

            <FlatList 
                data={books}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => <Book data={item}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
                ListEmptyComponent={() => (
                    <Center>
                        <Books color={colors.gray[300]} size={40}/>
                        <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                            {statusSelected === 'reading' ? 
                                `Você não começou \na ler nenhum livro` : 
                                `Você não terminou \n de ler nenhum livro`
                            }
                        </Text>
                    </Center>
                )}
            />
        </VStack>
    )
}