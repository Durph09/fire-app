import {useState} from 'react';
import {auth, storage, STATE_CHANGED} from '../lib/firebase';
import Loader from './Loader';

// upLoads images to firebase Storage
export default function ImageUploader(){
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    //Create a firebase Upload Task
    const uploadFile = async (e) => {
        //Get the File
        const file = Array.from(e.targetFiles)[0];
        const extension = file.type.split('/') [1];

        //Makes reference to the storage bucket location 
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
        setUploading(true);

        // Starts the upload
        const task = nref.put(file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);

            // Get downLoadURL after task resolves (note: this is not a native promise)
            task
                .then((d) => ref.getDownloadURL())
                .then((url) => {
                    setDownloadURL(url);
                    setUploading(false);
                });

        });
    };

    return (
        <div className='box'>
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {!uploading && (
                <>
                <label className='btn' >
                    📸 upload Img 
                    <input type='file' onChange={uploadFile} accept='image/-png, image/gif, image/jpeg'/>
                    </label>
                    </>
            )}
            {downloadURL && <code className='upload-snippet'> {`[alt](${downloadURL})`} </code>}

        </div>

    )
}