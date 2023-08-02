import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostContent({ post }) {
    console.log("post PostContnent js 5:  ", post)
    console.log("post.createdAT PostContnent js 7 typeof createdAT:  ", typeof post.createdAT)
    const createdAT = typeof post?.createdAT === 'number' ? new Date(post.createdAT) : post?.createdAT?.toDate();

    return (
        <div className="card">
          <h1>{post?.title}</h1>
          <span className="text-sm">
            Written by{' '}
            <Link href={`/${post.username}/`}>
              <span className="text-info">@{post.username}</span>
            </Link>{' '}
            on {createdAT?.toISOString()}
          </span>
          <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
      );
    }