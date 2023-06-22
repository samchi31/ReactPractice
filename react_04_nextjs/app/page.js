import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
      <h1>/app/page.js</h1>
      <ul>
        <li><a href='/sub'>/app/sub/page.js</a></li>
        <li><a href='/sub/about'>/app/sub/about/page.js</a></li>
        <li><a href='/sub/1'>/app/sub/[id]/page.js</a></li>
        <li><a href='/sub/2'>/app/sub/[id]/page.js</a></li>
      </ul>
    </div>
  )
}
