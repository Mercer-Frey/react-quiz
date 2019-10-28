import React from 'react';
import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-2b8af.firebaseio.com/'
})