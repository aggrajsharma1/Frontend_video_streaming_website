import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile, { userInfoLoader } from './components/Profile.jsx'
import Users from './components/Users.jsx'
import History, { watchHistoryInfoLoader } from './components/History.jsx'
import Watchpage from './components/Watchpage.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import Explore, { exploreSectionLoader } from './components/Explore.jsx'
import Subscriptions from './components/Subscriptions.jsx'
import Test from './components/Test/Test.jsx'
import TestProfile, { testloader } from './components/Test/TestProfile.jsx'
import Upload from './components/Upload.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      <Route path='' element={<Login />} />

      <Route path='users' element={<Users />}>

        <Route
          loader={userInfoLoader}
          path='profile'
          element={<Profile />}
        />

        <Route
          loader={watchHistoryInfoLoader}
          path='history'
          element={<History />}
        />

      </Route>

      <Route path='register' element={<Register />} />

      <Route
        loader={exploreSectionLoader}
        path='/videos/explore'
        element={<Explore />}
      />

      <Route
        loader={exploreSectionLoader}
        path='video/:videoId'
        element={<Watchpage />}
      />

      <Route path='channel/:channelName' element={<ChannelPage />} />

      <Route path='subscriptions' element={<Subscriptions />} />

      <Route path='upload' element={<Upload />} />

      {/* Testing Routes */}
      <Route path='test' element={<Test />} />
      <Route loader={testloader} path='testProfile' element={<TestProfile />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </>
)
