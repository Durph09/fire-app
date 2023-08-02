import { getUserWithUsername, postToJSON, firestore } from "@/lib/firebase";
import { query as fireQuery, collection, where, getDocs, limit, orderBy, getFirestore } from "firebase/firestore";

import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed"

export async function getServerSideProps({query}){
    const {username} = query;
    const userDoc = await getUserWithUsername(username);

    //if no user, short circuit to 404 page
    if(!userDoc) {
        return {
            notFound: true,
        };
    }

    //JSON serializable data
    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();

        const postsQuery = fireQuery(
            collection(getFirestore(), userDoc.ref.path, 'posts'),
            where ('published', '==', true),
            orderBy ('createdAt', 'desc'),
            limit(5)
        );
        posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    }
 
    return {
        props: {user, posts} // will be passed to the page component as props
    };
}

export default function UserProfilePage({user, posts}){
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
    )
}