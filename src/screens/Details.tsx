import { useRoute } from '@react-navigation/native';
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { BookOpen, CircleWavyCheck } from 'phosphor-react-native';
import { BookProps } from '../components/Book';
import { BookDetails } from '../components/BookDetails';
import { Header } from '../components/Header';

type RouteParams = {
    book: BookProps;
}

export function Details() {
    const route = useRoute();
    const {colors} = useTheme();
    const {book} = route.params as RouteParams;    
    
    const statusColor = book.status === 'reading' ? colors.secondary[700] : colors.primary[500];

    return (
        <VStack flex={1} bg='gray.700'>
            <Box px={6} bg="gray.600">
                <Header title={book.title} />
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

            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <BookDetails 
                    status={book.status} 
                    description={book.description}
                    icon={BookOpen}
                />
            </ScrollView>
        </VStack>
    );
}