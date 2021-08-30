import type { NextPage } from 'next'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/user/userSlice'
import { useRouter } from 'next/router'
import API from '../shared/api'

const Header: NextPage = () => {
  const router = useRouter()
  const userData = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const onClick = () => {
    new API().getHttpClient().delete('/logout', { withCredentials: true }
    ).then((response: any) => {
      console.log("logout response", response)
      localStorage.removeItem("token")
      dispatch(fetchUsers())
      router.push('/')
    })
    .catch((error: any) => {
      console.log("logout error", error)
    })
  }

  return (
    <header className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
      <Link href="/"><a id="logo">sample app</a></Link>
        <nav>
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <ul className="nav navbar-nav navbar-right collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
            <li><Link href="/"><a >Home</a></Link></li>
            <li><Link href="/help"><a >Help</a></Link></li>
            {
              userData.loading ? (
                <li><Link href="/"><a >Loading</a></Link></li>
              ) : userData.error ? (
                <li><Link href="/"><a >{userData.error}</a></Link></li>
              ) : userData.users ? (
                <>
                <li><Link href="/users"><a >Users</a></Link></li>
                <li><Link href={"/users/"+userData.users.id}>Profile</Link></li>
                <li><Link href={"/users/"+userData.users.id+"/edit"}><a >Settings</a></Link></li>
                <li className="divider"></li>
                <li>
                  {/*<button onClick={onClick}>Logout</button>*/}
                  <Link href="#logout"><a onClick={onClick}>Logout</a></Link>
                </li>
                </>
              ) : (
                <li><Link href="/login"><a >Log in</a></Link></li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header