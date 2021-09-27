export type Author = {
    name: string;
    picture: string;
}

export type Post = {
    title: string;
    description: string;
    coverImage: string;
    date: string;
    author: Author;
    ogImage: string;
    slug: string;
}