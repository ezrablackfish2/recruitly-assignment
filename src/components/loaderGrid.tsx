import { SimpleGrid, Skeleton, Stack, useMantineTheme, px } from '@mantine/core';


function LoaderGrid() {

    const theme = useMantineTheme();
    const BASE_HEIGHT = 640;
    // Helper function for skeleton height
    const getSubHeight = (children: number, spacing: number) =>
        BASE_HEIGHT / children - spacing * ((children - 1) / children);
    return <SimpleGrid cols={{ base: 3, xs: 3 }}>
        <Stack>
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
        </Stack>
        <Stack>
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
        </Stack>
        <Stack>
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
            <Skeleton height={getSubHeight(3, px(theme.spacing.md) as number)} radius="md" />
        </Stack>
    </SimpleGrid>;
}

export default LoaderGrid
