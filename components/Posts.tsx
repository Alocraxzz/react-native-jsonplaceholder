import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((data: Post[]) => setPosts(data))
            .catch(error => console.error(error));
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderItem = ({ item }: { item: Post }) => (
        <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
                placeholder="Search posts"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <FlatList
                data={filteredPosts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};