import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function Home() {
  
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards()
  }, [])

  const getBoards = async () => {
    await axios.get("http://localhost:8000/board/all", {
    })
    .then(res => {
      setBoards(res.data['board'])

    }).
    catch(err => console.log(err))
  }

  const movePage = (id) => {
    window.location.href=`./board/${id}`;
  }

  const moveCreatePage = () => {
    // window.location.href="/board/create";
  }

  const showDate = (d) => {
    const _d = new Date(d);
    return _d.toDateString();
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
          <div onClick={() => {window.location.href="./";}} >Exchange Diary</div>
        </h1>

        <p className={styles.description}>
          Participant :{' '}
          <br/>
          First Created at    
        </p>

        <div className={styles.grid}>
          <div onClick={() => {window.location.href="/board/create"}} className={styles.addCard} style={{}}>
            <span className="material-icons md-48" style={{fontSize: '48px'}}>add_circle_outline</span>
          </div>
          
          {boards.map(board => {
            return (<div key={board['id']} onClick={()=>movePage(board['id'])} className={styles.card}>
              <h2>{board.title} &rarr;</h2>
              <p lassName={styles.desc}>{board.desc}</p>
              <div className={styles.date}>{showDate(board.createdAt)}</div>
            </div>
            )
          })}
        </div>
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
