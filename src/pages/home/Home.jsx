import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'



function Home() {

  const context = useContext(MyContext)
  console.log(context)


  return (
    <Layout>
      Home
    </Layout>
  )
}

export default Home






  // Destructure
  // const {name,order} = context
  // console.log(name)
  // console.log(order)


  // return (
  //   <Layout>
  //     <h1>Name: {name}</h1>
  //     <h1>Order: {order}</h1>
  //   </Layout>
  // )