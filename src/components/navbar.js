import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <div>
      <Link href="/search">
        <a>Search</a>
      </Link>
      <Link href="/timeline">
        <a>Timeline</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      <Link href="/">
        <a>Trending</a>
      </Link>
    </div>
  )
}
