import {ApolloServer, gql} from "apollo-server-express";
import Booklist from './booklistModel';

const typeDefs = gql`
    type Book { 
        id: String!,
        title: String!, 
        author: String!, 
        description: String, 
        year: Int!, 
        lent: Boolean!, 
        lentBy: String
    }
    type Query { 
        book(id: String) : Book
        books: [Book]
    }
`;

// The resolvers
const resolvers = {
    Query: {
        book: async function (root, {id}) {
            return await Booklist.findById(id,function (err, book) {
                if(err) {
                    console.log(err);
                    return null;
                }
                return book
            });
        },
        books: async function (root, args) {
            return await Booklist.find(function (err, booklist) {
                if(err) {
                    console.log(err);
                    return null;
                }
                return booklist
            });
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

module.exports= server;

