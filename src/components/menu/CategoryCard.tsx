import Card from '../common/Card';

interface CategoryCardProps {
    name: string;
    onClick: () => void;
}

export default function CategoryCard({
    name,
    onClick
}: CategoryCardProps) {
    return (
        <Card
            onClick={onClick}
            variant="elevated"
            state="enabled"
            className="flex flex-col items-start justify-start p-4 h-[128px] w-full cursor-pointer hover:border-primary/20 transition-all"
        >
            <h3 className="font-semibold text-sm text-text-primary leading-[21px] tracking-[0.1px]">
                {name}
            </h3>
        </Card>
    );
}
