import { Box, Circle, HStack, IPressableProps, Pressable, Text, useTheme, VStack } from 'native-base';
import {Calendar, BookOpen, CircleWavyCheck} from 'phosphor-react-native';

export type BookProps = {
    id: number;
    title: string;
    description: string;
    when: string;
    status: 'reading' | 'finished';
}

type Props = IPressableProps & {
    data: BookProps;
}

export function Book({data, ...rest}: Props) {
    const {colors} = useTheme();

    const statusColor = data.status === 'reading' ? colors.secondary[700] : colors.primary[500];

    return (
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm"
                overflow="hidden"
            >   
                <Box h="full" w={2} bg={statusColor} />

                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        {data.title}
                    </Text>

                    <HStack alignItems="center">
                        <Calendar size={15} color={colors.gray[200]} />
                        <Text color="gray.200" fontSize="xs" ml={1}>
                            {data.when}
                        </Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} mr={5}>
                    {data.status === 'finished' ?
                        <CircleWavyCheck size={24} color={statusColor} /> : <BookOpen size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>
        </Pressable>
    );
}