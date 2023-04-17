import { Resolver, Query } from "type-graphql";
@Resolver()
export class UserResolver {
    // create a test query
    @Query(() => String)
    hello() {
        return "Hello World!";
    }
}
