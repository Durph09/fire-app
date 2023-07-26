import Loader from "../components/Loader";
import toast from 'react-hot-toast';



export default function Home() {
  return (
   <div>
<Loader />
<button onClick={() => toast.success('hello toast')}>
  Toast Me 
</button>
   </div>
  )
}
