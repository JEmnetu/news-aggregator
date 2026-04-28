export interface Article{
    id: number;
    uuid: string;
    title: string;
    description: string;
    url: string;
    image_url?: string;
    source: string;
    categories: string;
    published_at: Date;
    created_at: Date;
}