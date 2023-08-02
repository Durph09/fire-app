import Loader from "../components/Loader";
import toast from 'react-hot-toast';
import { firestore, postToJSON } from "@/lib/firebase";
import { Timestamp, query as firebaseQuery, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore} from 'firebase/firestore';
import { useState } from "react";
import PostFeed from "@/components/PostFeed";


//Max post to query er page
const LIMIT = 1;

export async function getServerSideProps(context) {
  const allPosts = firebaseQuery (collectionGroup(firestore, 'posts' ), where('published', '==', true), orderBy("createdAT", 'desc'), limit(LIMIT))
  const posts = ((await getDocs(allPosts)).docs.map(postToJSON));
  console.log("posts: ", posts)
  return {
    props: { posts }, // will be passed to the page components as props
  }

}

export default function Home(props) {
const [posts, setPosts] = useState(props.posts); // props rendered on the server are the initial value.  Set as state so that you can get more posts later
const [loading, setLoading] = useState(false);

const [postsEnd, setPostsEnd] = useState(false);

const getMorePosts = async() => {
setLoading(true);
const last = posts[posts.length -1];
const cursor = typeof last.createdAT === 'number' ? Timestamp.fromMillis(last.createdAT) : last.createdAT;

const postQuery = firebaseQuery (collectionGroup(firestore, 'posts' ), 
where('published', '==', true), 
orderBy("createdAT", 'desc'), 
limit(LIMIT),
startAfter(cursor)
);

const newPosts = (await getDocs(postQuery)).docs.map((doc) => doc.data());
setPosts(posts.concat(newPosts));
setLoading(false);

if (newPosts.length < LIMIT) {
  setPostsEnd(true)
}


};
  return (
   <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}

   </main>
  )
}
