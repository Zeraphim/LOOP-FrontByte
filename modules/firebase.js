import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  document,
  addDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import UploadFile from "../pages/api/UploadFile";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzmOW4HDoaWSMuNOwYRljuu0cU22a5GCE",
  authDomain: "loop-frontbyte.firebaseapp.com",
  projectId: "loop-frontbyte",
  storageBucket: "loop-frontbyte.appspot.com",
  messagingSenderId: "661727858302",
  appId: "1:661727858302:web:65ba7138555db6af14522f",
  measurementId: "G-FFGCVHP1RX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(data) {
  const email = data["email"];
  const password = data["password"];

  return createUserWithEmailAndPassword(auth, email, password).then((user) => {
    push_signup(user, data);
  });
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function pushComment(post, comment) {
  const db = getFirestore();
  const ref = doc(
    collection(db, `posts/location/${post.city_id}/${post.id}/comments`)
  );
  await setDoc(ref, {
    uid: comment.uid,
    message: comment.message,
    upvotes: 0,
    downvotes: 0,
  });

  return ref.id;
}

async function push_signup(user, data) {
  const db = getFirestore();
  const ref = collection(db, "users");
  await setDoc(doc(ref, user.user.uid), {
    id: user.user.uid,
    fName: data.fname,
    lName: data.lname,
    city: data.city,
    city_id: data.city_id,
    email: data.email,
    picture: "",
    points: {
      post_points: 0,
      comment_points: 0,
    },
    posts: {},
  }).then(() => {
    window.location.replace("/");
  });
}

export async function retrieveUserData(uid) {
  const db = getFirestore();
  const docref = doc(db, "users", uid);
  const querySnapshot = await getDoc(docref);
  let userData = querySnapshot.data();
  console.log(userData);
  if (userData.picture != "") {
    const storage = getStorage();
    const storageRef = ref(storage, `${uid}/${userData.picture}`);
    const url = await getDownloadURL(storageRef);
    userData["pictureURL"] = url;
    console.log("User data: ", userData);
    return userData;
  } else return userData;
}

async function fetchAux(post) {
  const db = getFirestore();
  const data = await getDocs(
    collection(db, "posts", `location/${post.city_id}/${post.id}/auxiliary`)
  );
  return data.docs[0].data();
}

async function fetchComments(post) {
  const exported = [];
  const db = getFirestore();
  const data = await getDocs(
    collection(db, "posts", `location/${post.city_id}/${post.id}/comments`)
  );
  data.forEach((comment) => {
    exported.push(comment.data());
  });
  return exported;
}

export async function uploadPost(post, user, file) {
  const db = getFirestore();
  const length_Raw = await getDoc(
    doc(db, `posts/location/${user.city_id}/`, "0")
  );
  const length = length_Raw.data();
  await setDoc(doc(db, `posts/location/${user.city_id}`, "0"), {
    length: length.length + 1,
  });
  const ref = doc(collection(db, `posts/location/${user.city_id}/`));
  const data = await setDoc(ref, {
    id: ref.id,
    caption: post.caption,
    category: post.category,
    city_id: user.city_id,
    owner: user.id,
    downvotes: 0,
    upvotes: 0,
  });
  const auxRef = doc(
    collection(db, "posts", `location/${user.city_id}/${ref.id}/auxiliary`)
  );
  const aux = await setDoc(auxRef, {
    description: post.auxiliary.description,
    location: post.auxiliary.location,
    media: post.auxiliary.media,
    name: post.auxiliary.name,
    reward: post.auxiliary.reward,
  });
  if (file != undefined) {
    UploadFile(file, `${ref.id}/${file.name}`);
  }
}

export async function retrieveAndBundlePost(post) {
  let user_data = {};
  let post_data = {};
  let aux_data = {};
  let commentData = {};
  await retrieveUserData(post.owner).then((user) => {
    user_data = user;
  });
  await fetchAux(post).then((aux) => {
    aux_data = {
      description: aux.description,
      location: aux.location,
      media: aux.media,
      name: aux.name,
      reward: aux.reward,
    };
  });
  await fetchComments(post).then((comments) => {
    commentData = comments;
  });
  post_data = {
    caption: post.caption,
    category: post.category,
    city_id: post.city_id,
    id: post.id,
    owner: post.owner,
    owner_data: user_data,
    auxiliary: aux_data,
    comments: commentData,
    upvotes: post.upvotes,
    downvotes: post.downvotes,
  };
  return post_data;
}

export async function retrieveAndBundlePosts(posts) {
  const users = [];
  const postAux_list = [];
  const bundledPosts = [];
  await posts.forEach(async (post) => {
    let user_data = await retrieveUserData(post.owner).then(
      (user) => (user_data = user)
    );
    let post_data = {};
    let aux_data = {};
    let commentData = {};
    fetchAux(post).then((aux) => {
      aux_data = {
        description: aux.description,
        location: aux.location,
        media: aux.media,
        name: aux.name,
        reward: aux.reward,
      };
      fetchComments(post).then((comments) => {
        commentData = comments;
        post_data = {
          caption: post.caption,
          category: post.category,
          city_id: post.city_id,
          id: post.id,
          owner: post.owner,
          owner_data: user_data,
          auxiliary: aux_data,
          comments: commentData,
          upvotes: post.upvotes,
          downvotes: post.downvotes,
        };
        bundledPosts.push(post_data);
      });
    });
  });

  return bundledPosts;
}

async function uploadProfilePicture(file, uid) {
  const storage = getStorage();
  const storageRef = ref(storage, `${uid.trim()}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
}

export async function changeSettings(user, changes, city) {
  console.log("Change settings data: ", changes);
  let newFName = "";
  let newLName = "";
  let newLocation = "";
  let newPicture = null;
  if (changes.fName != "") newFName = changes.fName;
  if (changes.lName != "") newFName = changes.lName;
  if (changes.location != "") newLocation = changes.location;
  if (changes.picture != null) {
    await uploadProfilePicture(changes.picture, user.id).then(() => {
      console.log("Finished uploading");
    });
    newPicture = changes.picture;
  }
  let newUserData = {
    fName: newFName != "" ? newFName : user.fName,
    lName: newLName != "" ? newLName : user.lName,
    email: user.email,
    city: city != "" ? city : user.city,
    city_id: newLocation != "" ? newLocation : user.city_id,
    picture: newPicture != null ? newPicture.name : user.picture,
    id: user.id.trim(),
    points: {
      post_points: user.points.post_points,
      comment_points: user.points.comment_points,
    },
  };
  const db = getFirestore();
  const ref = collection(db, "users");
  await updateDoc(doc(ref, user.id.trim()), newUserData);
}
