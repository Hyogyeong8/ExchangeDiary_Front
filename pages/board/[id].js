import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Create.module.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import {useRouter} from 'next/router';

axios.defaults.baseURL = 'http://ssal.sparcs.org:22998/';

export default function Home() {
  const router = useRouter()
  const {id} = router.query
  const [board, setBoard] = useState({
    title: "",
    desc: "",
    userId: 0,
  });

  const [newComment, setNewComment] = useState({
    content: "",
    createdBy: 0,
    BoardId: id,
  })

  const [comments, setComments] = useState([])

  useEffect(() => {
    getBoard()
  }, [id])

  const getBoard = async () => {
    await axios.get("/board/", {
      params: {
        id: id
      }
    })
    .then(res => {
      setBoard(res.data['board'])
      setComments(res.data['comments'])
      console.log(comments)
    }).
    catch(err => console.log(err))
  }

  const modify = () => {
    window.location.href = `modify/${id}`;
  }

  const deletion = async () => {
    await axios.delete("/board/", {
      params: {
        id: id
      }
    })
    .then(res => {
      alert("Success to delete your post!!")
      window.location.href = "./.."
    }).
    catch(err => console.log(err))
  }

  const showDateTime = (d) => {
    const _d = new Date(d);
    return _d.toLocaleString();
  }

  const showDate = (d) => {
    const _d = new Date(d);
    return _d.toLocaleDateString();
  }

  const updateNewComment = (text)=>{
    const cp = {...newComment}
    cp.content = text
    setNewComment(cp)
  }

  const send = async ()=>{
    await axios.post("/board/comment", newComment)
    .then(function(response){
      console.log(response);
      window.location.href=`./${id}`
    }).catch(function(error){
      console.log(error);
    })
  }

  const comDeletion = async (comId) => {
    console.log(comId);
    await axios.delete("/board/comment", {
      params: {
        id: comId
      }
    })
    .then(res => {
      window.location.href = `./${id}`
    }).
    catch(err => console.log(err))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Exchange Diary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/outline_book_black_24dp.png" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Tangerine:wght@700&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div onClick = {() => {window.location.href="../"}} >Exchange Diary</div>
        </h1>
        <div className={styles.card}>
          <textarea className={styles.boardTitle} value={board.title}></textarea>
          <div className={styles.date}>{showDateTime(board.createdAt)}</div>
          <br/>
          <textarea className={styles.boardDesc} id={styles.small} value={board.desc}></textarea>
          <button className={styles.control} onClick={e=>deletion()}>Delete</button>
          <button className={styles.control} onClick={e=>modify()}>Modify</button>
        </div>
        <div className={styles.card} id={styles.comment}>
          <textarea className={styles.comment} value={newComment.content} onChange={e=>updateNewComment(e.target.value)}></textarea>
          <button className={styles.control} onClick={e=>send()}>Send</button>
        </div>
        {comments.map(com => {
          return (<div key={com['id']} className={styles.card} id={styles.comment}>
            <textarea className={styles.comment}>{com.content}</textarea>
            <div className={styles.date}>{showDate(com.createdAt)}</div>
            <button className={styles.control} id={styles.commentDel} onClick={e=>comDeletion(com.id)}>Delete</button>
          </div>)
        })}
      </main>

      <footer className={styles.footer}>
        <div
          onClick = {() => {window.location.href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"}}
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Diana from SPARCS
          <span className={styles.logo}>
            <Image src="/color_lens_black_18dp.svg" alt="Vercel Logo" width={22} height={22}/>
          </span>
        </div>
      </footer>
    </div>
  )
}
