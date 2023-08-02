import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import {firestore, getUserWithUsername, postToJSON} from '../../lib/firebase';
import {useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, getDocs, getDoc, collectionGroup, query, limit, getFirestore } from 'firebase/firestore';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';

export async function getStaticProps({params}) {
const { username, slug } = params;
const userDoc = await getUserWithUsername(username);

let post;
let path;

if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, 'posts', slug);
    post = postToJSON(await getDoc(postRef) );

    path = postRef.path;
}
return {
    props: { post, path},
    revalidate: 5000,
};

}

export async function getStaticPaths() {
    //Improve by using Admin SDK to select empty docs
    const q = query (collectionGroup(firestore, 'posts', limit(20) ))
    
    const snapShot = await getDocs(q);
    const paths = snapShot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: {username, slug},
        };
    });

    return {
// must be in this format: 
// paths: [
    // {params: {username, slug }}
//],
paths,
fallback: 'blocking',
    };
}

export default function Post(props) {
 const postRef = doc(getFirestore(), props.path);
 const [realtimePost] = useDocumentData(postRef);
 const post = realtimePost || props.post

 const {user: currentUser } = useContext(UserContext);
    return (
        <main>
            <section>
                <PostContent post={post} />
            </section>

            <aside className='card'>
                <p>
                    <strong>{post.heartCount || 0} ❤️</strong>
                </p>
            </aside>
        </main>
    )
}