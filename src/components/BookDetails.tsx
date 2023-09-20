import { HStack, Text, useTheme, VStack } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import { ElementType } from 'react';

type Props = {
    title: string;
    status: 'reading' | 'finished';
    description: string;
    icon: ElementType<IconProps>;
}

export function BookDetails({title, status, description, icon: Icon}: Props) {
    const {colors} = useTheme();

    const statusColor = status === 'reading' ? colors.secondary[700] : colors.primary[700];

    return (
        <VStack bg='gray.600' p={5} mt={5} rounded='sm' mx={6}>
            <HStack alignItems='center' mb={4}>
                <Icon color={statusColor} />
                <Text ml={2} color='gray.300' fontSize='sm' textTransform='uppercase'>
                    {title}
                </Text>
            </HStack>

            {!!description && (
                <Text color='gray.100' fontSize='md'>
                    {description}
                </Text>
            )}
        </VStack>
    )
}