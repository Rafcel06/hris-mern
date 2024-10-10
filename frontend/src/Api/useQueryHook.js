import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const useQuery = (url,paginate,offset, openSnackbar) => {
  const [data, setData] = useState(null);
  const [queryLoading, setLoading] = useState(true);
  const [queryError, setError] = useState(false);
  

 const fetchData = async () => {
  try {
    // setLoading(true);
    const response = await axios.get(url + paginate + "/" + offset,{
      headers : {
       'Authorization' : `Bearer ${JSON.parse(secureLocalStorage.getItem('authenticate')).token}`
      }});
   
    if(!response.data) {
        setError('Session has expired')
        return
     }

    setData(response.data);
    // setLoading(false);
    // setQuery(false);
    return
  } 
  catch(err) {
    setError(err || true);
    // setLoading(false);
    // setQuery(false);
   return
  }
  
};

  useEffect(() => {
    fetchData();
  }, [paginate,offset,openSnackbar]); // add opensnackBar and reQuery to Update

  

  const createProfile = (postUrl,newItem) =>  {
      return  axios.post(postUrl, newItem, {
          headers : {
           'Authorization' : `Bearer ${JSON.parse(secureLocalStorage.getItem('authenticate')).token}`
      }})
  }


  const updateProfile = (putUrl,updatedItem) => {
      return  axios.put(putUrl, updatedItem, {
        headers : {
         'Authorization' : `Bearer ${JSON.parse(secureLocalStorage.getItem('authenticate')).token}`
      }})
  }



  const deleteProfile = (deleteUrl) => {
    return axios.delete(deleteUrl, {
            headers : {
             'Authorization' : `Bearer ${JSON.parse(secureLocalStorage.getItem('authenticate')).token}`
      }})
   }


  return { data, queryLoading, queryError, setError, createProfile, updateProfile, deleteProfile };
};

export default useQuery;

   

