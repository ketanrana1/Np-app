import React, { useEffect } from 'react'
import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../common/environment';
import Connections from "../../utils/jsonFiles/connections.json"
import ConnectionTypes from "../../utils/jsonFiles/connectionTypes.json"
import Tasks from "../../utils/jsonFiles/tasks.json"
import TaskTypes from "../../utils/jsonFiles/taskTypes.json"

const AddInitialData = (props) => {

  const hasBeenLoaded = localStorage.getItem('hasBeenLoaded');
  
  if( hasBeenLoaded === null && sessionStorage.getItem('Auth key') ) {
    
    TaskTypes.map(async (item, index) => {
        try {
        const result = await axios({
          method: 'post',    
          url: `${REACT_APP_BACKEND_URL}/api/add-task-type`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          },
          data: item     
        }); 
        
      } catch (error) {
        console.log(error)    
      }

    }) 

    Tasks.map(async (item, index) => {
        try {
        const result = await axios({
          method: 'post',    
          url: `${REACT_APP_BACKEND_URL}/api/add-task`,
          headers: {
              'Authorization': `${sessionStorage.getItem('AccessToken')}`
          },
          data: item     
        });
        
      } catch (error) {
        console.log(error)    
      }

    })

    ConnectionTypes.map(async (item, index) => {
      try {
      const result = await axios({
        method: 'post',    
        url: `${REACT_APP_BACKEND_URL}/api/add-connection-type`,
        headers: {
            'Authorization': `${sessionStorage.getItem('AccessToken')}`
        },
        data: item     
      });
    
      
    } catch (error) {
      console.log(error)    
    }

  })

  Connections.map(async (item, index) => {
    try {
    const result = await axios({
      method: 'post',    
      url: `${REACT_APP_BACKEND_URL}/api/add-connection`,
      headers: {
          'Authorization': `${sessionStorage.getItem('AccessToken')}`
      },
      data: item     
    });
    

  } catch (error) {
    console.log(error)    
  }

})

localStorage.setItem('hasBeenLoaded', 'true')
}


    

    
  return (
    <>
    </>
  )
}

export default AddInitialData