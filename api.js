import { initializeApp } from 'firebase/app'
import { 
    getFirestore, 
    collection, 
    doc,
    getDocs, 
    getDoc,
    query,
    where
} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyAFe4qU6GVnXNmV-q6wp6lLZBi_ysdQQ1I',
  authDomain: 'vanlife-b1a9b.firebaseapp.com',
  projectId: 'vanlife-b1a9b',
  storageBucket: 'vanlife-b1a9b.appspot.com',
  messagingSenderId: '998243561338',
  appId: '1:998243561338:web:628994d8de55993dee30c3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef)
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return dataArr
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id)
  const vanSnapshot = await getDoc(docRef)
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  }
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'))
  const querySnapshot = await getDocs(q)
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return dataArr
}

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  })
  const data = await res.json()

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    }
  }

  return data
}
