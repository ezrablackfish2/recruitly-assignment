// import { IconHeart } from '@tabler/icons-react';
// ActionIcon
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import classes from './BadgeCard.module.css';

interface BadgeCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    country: string;
    badges: { emoji: string; label: string }[];
}

export function BadgeCard({ id, image, title, description, country, badges }: BadgeCardProps) {
    const handleClick = () => {
        window.location.href = `/details/${id}`;
    }
    const features = badges.map((badge) => (
        <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={image} alt={title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                    <Badge size="sm" variant="light">
                        {country}
                    </Badge>
                </Group>
                <Text fz="sm" mt="xs" style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 3, // Change this number to the desired number of lines
                    lineClamp: 3, // Change this number to the desired number of lines
                }} >
                    {description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }} onClick={handleClick}>
                    Show details
                </Button>
                {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon> */}
            </Group>
        </Card>
    );
}
